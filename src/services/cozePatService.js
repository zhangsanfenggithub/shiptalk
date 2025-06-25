import { ref, onMounted } from 'vue';
import { ChatEventType, CozeAPI, RoleType, } from '@coze/api';
import { config } from '../config/cozeConfig';
export const useCozeAPI = () => {
    const clientRef = ref(null);
    const botInfo = ref();
    const fileInfoRef = ref();
    const uploading = ref(false);
    const initClient = () => {
        const baseUrl = config.getBaseUrl();
        const pat = config.getPat();
        clientRef.value = new CozeAPI({
            token: pat,
            baseURL: baseUrl,
            allowPersonalAccessTokenInBrowser: true,
            baseWsURL: config.getBaseWsUrl(),
            debug: false,
        });
    };
    const createMessage = (query, fileInfo) => {
        const baseMessage = {
            role: RoleType.User,
            type: 'question',
        };
        if (fileInfo) {
            return [
                {
                    ...baseMessage,
                    content: [
                        { type: 'text', text: query },
                        { type: 'file', file_id: fileInfo.id },
                    ],
                    content_type: 'object_string',
                },
            ];
        }
        return [
            {
                ...baseMessage,
                content: [{ type: 'text', text: query }],
                content_type: 'text',
            },
        ];
    };
    const streamingChat = async ({ query, conversationId, onUpdate, onSuccess, onCreated, }) => {
        if (!clientRef.value) {
            return;
        }
        const botId = config.getBotId();
        const messages = createMessage(query, fileInfoRef.value);
        const [v] = await Promise.all([clientRef.value.chat.stream({
                bot_id: botId,
                auto_save_history: true,
                additional_messages: messages,
                conversation_id: conversationId,
            })]);
        let msg = '';
        for await (const part of v) {
            if (part.event === ChatEventType.CONVERSATION_CHAT_CREATED) {
                console.log('[START]');
                onCreated(part.data);
            }
            else if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
                msg += part.data.content;
                onUpdate(msg);
            }
            else if (part.event === ChatEventType.CONVERSATION_MESSAGE_COMPLETED) {
                const { role, type, content: msgContent } = part.data;
                if (role === 'assistant' && type === 'answer') {
                    msg += '\n';
                    onSuccess(msg);
                }
                else {
                    console.log('[%s]:[%s]:%s', role, type, msgContent);
                }
            }
            else if (part.event === ChatEventType.CONVERSATION_CHAT_COMPLETED) {
                console.log(part.data.usage);
            }
            else if (part.event === ChatEventType.DONE) {
                console.log(part.data);
            }
        }
        console.log('=== End of Streaming Chat ===');
    };
    const uploadFile = async (file) => {
        if (!clientRef.value) {
            throw new Error('Client not initialized');
        }
        if (!file) {
            fileInfoRef.value = undefined;
            return;
        }
        uploading.value = true;
        try {
            const res = await clientRef.value.files.upload({
                file,
            });
            fileInfoRef.value = res;
            return res;
        }
        finally {
            uploading.value = false;
        }
    };
    const getBotInfo = async (botName) => {
        if (!clientRef.value) {
            return;
        }
        const botId = config.getBotIdFromMap(botName);
        if (!botId) {
            console.warn(`未找到 ${botName} 对应的 botid`);
            return;
        }
        const res = await clientRef.value.bots.retrieve({
            bot_id: botId,
        });
        botInfo.value = res;
    };
    onMounted(() => {
        initClient();
    });
    return {
        clientRef,
        initClient,
        streamingChat,
        uploadFile,
        getBotInfo,
        botInfo,
        uploading,
    };
};

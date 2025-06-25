import { ref, onMounted, Ref } from 'vue';
import {
  type BotInfo,
  ChatEventType,
  CozeAPI,
  type CreateChatData,
  type EnterMessage,
  type FileObject,
  RoleType,
} from '@coze/api';

import { config } from '../config/cozeConfig';

export const useCozeAPI = () => {
  const clientRef: Ref<CozeAPI | null> = ref(null);
  const botInfo = ref<BotInfo | undefined>();
  const fileInfoRef = ref<FileObject | undefined>();
  const uploading = ref(false);

  // 初始化客户端
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

  // 创建消息格式
  const createMessage = (query: string, fileInfo?: FileObject): EnterMessage[] => {
    const baseMessage: EnterMessage = {
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

  // 流式聊天实现
  const streamingChat = async ({
    query,
    conversationId,
    onUpdate,
    onSuccess,
    onCreated,
  }: {
    query: string;
    conversationId?: string;
    onUpdate: (delta: string) => void;
    onSuccess: (delta: string) => void;
    onCreated: (data: CreateChatData) => void;
  }) => {
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
      } else if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
        msg += part.data.content;
        onUpdate(msg);
      } else if (part.event === ChatEventType.CONVERSATION_MESSAGE_COMPLETED) {
        const { role, type, content: msgContent } = part.data;
        if (role === 'assistant' && type === 'answer') {
          msg += '\n';
          onSuccess(msg);
        } else {
          console.log('[%s]:[%s]:%s', role, type, msgContent);
        }
      } else if (part.event === ChatEventType.CONVERSATION_CHAT_COMPLETED) {
        console.log(part.data.usage);
      } else if (part.event === ChatEventType.DONE) {
        console.log(part.data);
      }
    }
    console.log('=== End of Streaming Chat ===');
  };

  // 文件上传功能
  const uploadFile = async (file?: File) => {
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
    } finally {
      uploading.value = false;
    }
  };

  // 获取机器人信息
  const getBotInfo = async (botName: string) => {
    if (!clientRef.value) {
      return;
    }
    // 使用 getBotIdFromMap 根据 bot 名称获取 botid
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

  // Vue生命周期钩子，组件挂载时初始化客户端
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
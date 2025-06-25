export const config = {
    getBaseUrl: () => localStorage.getItem('chat-x_base_url') || 'https://api.coze.cn',
    getBaseWsUrl: () => localStorage.getItem('chat-x_base_ws_url') || 'wss://ws.coze.cn',
    getPat: () => localStorage.getItem('chat-x_pat') || 'pat_xBuCYoh01oKpeIIYTDJYbAX3XKltgP4lwcIapxzKcsEyxa2JL052KsJp1tXBRWq4',
    getBotId: () => localStorage.getItem('chat-x_bot_id') || '7518989237744795658',
    getBotIdByName: (id) => localStorage.getItem(id),
    getBotIdFromMap: (botName) => {
        return config.botNameToIdMap[botName] || null;
    },
    botNameToIdMap: {
        '思政型智能体对话': '7518988403992428544',
        '课程型智能体对话': '7519732836270637106',
        '竞赛型智能体对话': '7519731419292221477',
        '探究型智能体对话': '7518990785850228774',
        '任务型智能体对话': '7518989237744795658',
        '评价型智能体对话': '7519729608972419087',
    },
};

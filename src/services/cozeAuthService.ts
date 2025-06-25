// import {
//   getPKCEAuthenticationUrl,
//   getPKCEOAuthToken,
//   refreshOAuthToken,
//   CozeAPI,
//   COZE_CN_BASE_URL,
// } from "@coze/api";

// import { ref } from "vue";

// // 存储令牌和客户端实例
// export const accessToken = ref<string | null>(null);
// export const refreshToken = ref<string | null>(null);
// export let cozeClient: CozeAPI | null = null;

// export const generateAuthUrl = async () => {
//   const clientId = import.meta.env.VITE_COZE_CLIENT_ID;
//   const redirectUrl = import.meta.env.VITE_COZE_REDIRECT_URL;
//   const baseURL = import.meta.env.VITE_COZE_BASE_URL || COZE_CN_BASE_URL;
//   if (!clientId || !redirectUrl) {
//     throw new Error("缺少 OAuth 配置");
//   }

//   try{
//     const {url, codeVerifier} = await getPKCEAuthenticationUrl({clientId, redirectUrl, baseURL, state:"login"});
//     return {url, codeVerifier};
//   }catch(error){
//     console.error("获取授权 URL 失败", error);
//     throw error;
//   }
// };

// // 通过授权码获取令牌
// export const getTokenByCode = async (code: string, codeVerifier: string) => {
//   const clientId = import.meta.env.VITE_COZE_CLIENT_ID;
//   const redirectUrl = import.meta.env.VITE_COZE_REDIRECT_URL;
//   const baseURL = import.meta.env.VITE_COZE_BASE_URL || COZE_CN_BASE_URL;

//   if (!clientId || !redirectUrl) {
//     throw new Error('缺少 OAuth 配置');
//   }

//   try {
//     const tokenData = await getPKCEOAuthToken({
//       clientId,
//       redirectUrl,
//       baseURL,
//       code,
//       codeVerifier,
//     });
//     accessToken.value = tokenData.access_token;
//     refreshToken.value = tokenData.refresh_token;
//     initCozeClient();
//     return tokenData;
//   } catch (error) {
//     console.error('获取令牌失败', error);
//     throw error;
//   }
// };
// // 刷新令牌
// export const refreshToken = async () => {
//   if (!refreshToken.value) {
//     throw new Error('无刷新令牌');
//   }

//   const clientId = import.meta.env.VITE_COZE_CLIENT_ID;
//   const baseURL = import.meta.env.VITE_COZE_BASE_URL || COZE_CN_BASE_URL;

//   try {
//     const newTokenData = await refreshOAuthToken({
//       clientId,
//       refreshToken: refreshToken.value,
//       baseURL,
//     });
//     accessToken.value = newTokenData.access_token;
//     refreshToken.value = newTokenData.refresh_token;
//     if (cozeClient) {
//       cozeClient = new CozeAPI({
//         baseURL,
//         token: accessToken.value,
//       });
//     }
//     return newTokenData;
//   } catch (error) {
//     console.error('刷新令牌失败', error);
//     throw error;
//   }
// };

// // 初始化 CozeAPI 客户端
// const initCozeClient = () => {
//   if (accessToken.value) {
//     const baseURL = import.meta.env.VITE_COZE_BASE_URL || COZE_CN_BASE_URL;
//     cozeClient = new CozeAPI({
//       baseURL,
//       token: accessToken.value,
//     });
//   }
// };
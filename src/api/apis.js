import axios from "axios";
import { cookies } from "../shared/cookies";

const token = cookies.get("access_token");

// 토큰없이 보낼때
export const apis = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 토큰 넣어서 보낼때
export const apis_token = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

apis_token.interceptors.request.use(config => {
  if (config.headers.Authorization === "Bearer undefined") {
    const token = cookies.get("access_token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//-------------------------------------------------
// apis_token.interceptors.request.use(
//   // 요청을 보내기 전 수행되는 함수
//   function (config) {
//     console.log('?')
//     //서버에서 token값만 받기로 함 -> Bearer 추가하여 header에 보낼 것.
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },

//   // 오류 요청을 보내기 전 수행되는 함수
//   function (error) {
//     return Promise.reject(error);
//     // return error X
//     // return Promise.reject O
//   }
// );
//-------------------------------------------------

apis_token.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    return response;
  },

  // 오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    return Promise.reject(error);
  }
);

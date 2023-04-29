import axios from "axios";
import { cookies } from "../shared/cookies";

// 토큰없이 보낼때
export const apis = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 토큰 넣어서 보낼때
export const apis_token = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {},
});

apis_token.interceptors.request.use(
  config => {
    const token = cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//Refresh Token------------------------------------------
// apis_token.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;

//     //status code 401 && originalRequest._retry === false
//     /*
//      _retry는 원래 요청(originalRequest)을 재시도할지 결정함.
//      error.config에서 originalRequest._retry가 false인지 true인지 확인 가능.
//      interceptors에서 에러가 발생했을때 originalRequest._retry를 true로 바꾸고 Refresh Token을 요청함.
//     */
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refresh_token = cookies.get("refresh_token");
//       const res = await axios.post(
//         `${process.env.REACT_APP_SERVER_URL}/api/token/refresh/`,
//         {
//           refresh: refresh_token,
//         }
//       );
//       if (res.status === 200) {
//         const token = res.data.access;
//         cookies.set("access_token", token);
//         return apis_token(originalRequest);
//       }
//       // if (res.status === 200) {
//       //   const token = res.data.access;
//       //   cookies.set("access_token", token);
//       //   const newRequest = { ...originalRequest };
//       //   newRequest.headers.Authorization = `Bearer ${token}`;
//       //   return axios(newRequest);
//       // }
//     }
//     return Promise.reject(error);
//   }
// );

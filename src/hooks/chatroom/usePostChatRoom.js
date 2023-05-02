// react-query에서 useMutation, useQueryClient를 import합니다.
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// api 호출을 위한 apis를 import합니다.
import { apis } from "../../api/apis";
// 쿠키를 다루기 위한 cookies를 import합니다.
import { cookies } from "../../shared/cookies";
// query key를 관리하기 위한 keys를 import합니다.
// import { keys } from "../../shared/queryKeys";

// chatroom을 작성하는 함수입니다.
export const postChatRoom = async (payload) => {
  // access_token을 쿠키에서 가져옵니다.
  const token = cookies.get("access_token");
  // apis.post를 이용해 chatroom을 생성합니다.
  const response = await apis.post("/chat", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // 작성한 chatroom을 반환합니다.
  return response;
};
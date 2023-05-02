import { apis } from "../../api/apis";
import { cookies } from "../../shared/cookies";
import { useCallback, useState } from "react";

export const useGetChatHistory = () => {
  const token = cookies.get("access_token");

  const [response, setResponse] = useState(undefined);

  const getChatHistory = useCallback(async (chatRoomId) => {
    try {
      const response = await apis.get(`/chat/history?chatRoomId=${chatRoomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse(response.data.chatHistory);
    } catch (error) {
      setResponse(undefined);
    }
  }, [token]);

  return [getChatHistory, { response }];
};
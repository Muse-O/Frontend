import { apis } from "../../api/apis";
import { cookies } from "../../shared/cookies";
import { useCallback, useState } from "react";

export const useGetMyChatRoom = () => {
  const token = cookies.get("access_token");

  const [response, setResponse] = useState(undefined);

  const getMyChatRoom = useCallback(async (reqCnt) => {
    try {
      const response = await apis.get("/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResponse(response);
    } catch (error) {
      setResponse(undefined);
    }
  }, [token]);

  return [getMyChatRoom, { response }];
};

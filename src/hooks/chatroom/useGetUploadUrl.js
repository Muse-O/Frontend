import { apis } from "../../api/apis";
import { cookies } from "../../shared/cookies";
import { useCallback, useState } from "react";

export const useGetUploadUrl = () => {
  const token = cookies.get("access_token");

  const [response, setResponse] = useState(null);

  const getUploadUrls = useCallback(async (reqCnt) => {

    try {
      const response = await apis.get(`/upload?reqCnt=${reqCnt}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setResponse(response);
    } catch (error) {
      setResponse(null);
    }
  }, [token]);

  return [getUploadUrls, { proivdedURL: response }];
};
import { useQuery } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { cookies } from "../../shared/cookies";

export const useGetUsers = (fetchKeyword) => {
  const token = cookies.get("access_token");
  
  const { isLoading, isError, data } = useQuery(
    async () => {
      const response = await apis.get(`/chat?userNickname=${fetchKeyword}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      queryKey: keys.GET_CHATROOM,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  return { isLoading, isError, data };
};

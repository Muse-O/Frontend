import { useQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis } from "../../api/apis";
import { cookies } from "../../shared/cookies";

export const useSearchRecent = (searchWindow) => {
  const token = cookies.get("access_token");
  const { isLoading, isError, data } = useQuery({
    queryKey: keys.GET_UNIFIEDSEARCHRECENT,
    queryFn: async () => {
      const response = await apis.get("/search/recent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.recentHistory;
    },
    enabled: searchWindow,
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (e) => {
      console.log("error", e.message);
    },
  });
  return { isLoading, isError, data };
};

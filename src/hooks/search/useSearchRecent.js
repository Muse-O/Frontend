import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useSearchRecent = (searchWindow) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: keys.GET_UNIFIEDSEARCHRECENT,
    queryFn: async () => {
      const response = await apis_token.get("/search/recent");
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

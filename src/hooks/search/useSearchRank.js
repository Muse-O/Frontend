import { apis } from "../../api/apis"
import { keys } from "../../shared/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useSearchRank = (searchWindow) => {
  const {isLoading, isError, data} = useQuery({
    queryKey : keys.GET_UNIFIEDSEARCHRANK,
    queryFn: async () => {
      const response = await apis.get("/search/rank");
      return response.data.searchRank
    },
    enabled: searchWindow,
    refetchOnWindowFocus: false,
    onError: (e) => {
      console.log("error", e.message);
    }
  })
  return {isLoading, isError, data} 
}


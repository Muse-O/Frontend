import { apis } from "../../api/apis"
import { keys } from "../../shared/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useMostLike = () => {
  const  {isLoading, isError, data} = useQuery({
    queryKey: keys.GET_MAINMOSTLIKE,
    queryFn: async () => {
      const response = await apis.get('/banner/getOpenExhibitionsSortedByMostLike?reqCnt=10')
      return response.data.exhibitionList
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (e) => {
      console.log(e.message);
    },
  })

  return {isLoading, isError, data}
}
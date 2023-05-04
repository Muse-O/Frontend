import { apis } from "../../api/apis"
import { keys } from "../../shared/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useOpenExhibitionByDate = () => {

  const  {isLoading, isError, data} = useQuery({
    queryKey: keys.GET_MAINOPENEXHIBITIONBYDATE,
    queryFn: async () => {
      const response = await apis.get('/banner/getOpenExhibitionsSortedByDate?reqCnt=10')
      return response.data.exhibitionList.rows
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (e) => {
      console.log(e.message);
    },
  })

  return {isLoading, isError, data}
}
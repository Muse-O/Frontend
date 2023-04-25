
import { useRecoilState, useRecoilValue } from "recoil"
import { keys } from "../../shared/queryKeys"
import { searchDataState, searchWordState } from "./seartStore"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { apis } from "../../api/apis"
import { useEffect } from "react"

export const useUnifiedSearch = () => {
  const searchWord = useRecoilValue(searchWordState)
  const queryClient = useQueryClient();
  const [_, setData] = useRecoilState(searchDataState)
  useEffect(()=> {
    console.log(`/search?searchText=${searchWord}`);
    queryClient.invalidateQueries(keys.GET_UNIFIEDSEARCH)
  },[searchWord])

  const { isLoading, isError } = useQuery({
    queryKey: keys.GET_UNIFIEDSEARCH,
    queryFn: async () => {
      const response = await apis.get(`/search?searchText=${searchWord}`)
      console.log("useQuery 결과 =========", response.data.search);
      return response.data.search
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data) => {
      setData(data)
    },
    onError: (e) => {
      console.log(e.message);
    },
  })
  return { isLoading, isError }
}

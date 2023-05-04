import { keys } from "../../shared/queryKeys";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchDataState, searchWordState } from "./seartStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { useEffect } from "react";
import { useHeaderState } from "../useHeaderState";

export const useUnifiedSearch = () => {
  const searchWord = useRecoilValue(searchWordState);
  const queryClient = useQueryClient();
  
  const [, setData] = useRecoilState(searchDataState);
  useHeaderState()
  useEffect(() => {
    queryClient.invalidateQueries([keys.GET_UNIFIEDSEARCH, searchWord]);
  }, [searchWord]);

  const { isLoading, isError } = useQuery({
    queryKey: [keys.GET_UNIFIEDSEARCH, searchWord],
    queryFn: async () => {
      const response = await apis_token.get(`/search?searchText=${searchWord}`);
      return response.data.search;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data) => {
      setData(data);
    },
    onError: (e) => {
      console.log(e.message);
    },
  });

  return { isLoading, isError };
};

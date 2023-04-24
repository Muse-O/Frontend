import { useInfiniteQuery } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useGetExhibitioninfinity = (pageSize = 5) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: keys.GET_EXHIBITION,
      queryFn: async ({ pageParam = 5 }) => {
        // pageParam은 useInfiniteQuery가 현재
        // 어떤 페이지에 있는지를 확인할 수 있는 파라미터 값
        const res = await apis_token.get(
          `/exhibition?limit=${pageSize}&offset=${pageParam}`
        );
        return res.data.exhibitionList.rows;
      },
      getNextPageParam: (lastPage, allPages) => {
        // lastPage는 useInfiniteQuery를 이용해 호출된 가장 마지막에 있는 페이지 데이터
        // allPages는 useInfiniteQuery를 이용해 호출된 모든 페이지 데이터
        if (lastPage?.length < pageSize) {
          return undefined;
        }
        return allPages?.length * pageSize;
      },
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (e) => {
        console.log(e.message);
      },
    });
  return [data, isLoading, isError, fetchNextPage, hasNextPage];
};

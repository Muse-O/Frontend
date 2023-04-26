import { useInfiniteQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis, apis_token } from "../../api/apis";

export const useGetExhibitioninfinity = (pageSize = 10) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: keys.GET_EXHIBITION,
      queryFn: async ({ pageParam = 0 }) => {
        const res = await apis_token.get(
          `/exhibition?limit=${pageSize}&offset=${pageParam}`
        );
        console.log("res", res);
        return res.data.exhibitionList.rows;
      },
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < pageSize) {
          return undefined;
        }
        return allPages.length * pageSize;
      },
      refetchOnWindowFocus: false,
      retry: 1,
      onError: (e) => {
        console.log(e.message);
      },
    });
  return { data, isLoading, isError, fetchNextPage, hasNextPage };
};

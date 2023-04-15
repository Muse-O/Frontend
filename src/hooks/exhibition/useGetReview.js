import { useInfiniteQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis } from "../../api/apis";

export const useGetReview = (id, limit) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: keys.GET_REVIEWS,
      queryFn: async ({ pageParam = 0 }) => {
        const res = await apis.get(
          `/exhibition/${id}/reviews?limit=${limit}&offset=${pageParam}`
        );
        return res.data;
      },

      // 파라미터 값으로 크게 lastPage, allPages 값을 전달받을 수 있습니다.
      // lastPage는 useInfiniteQuery를 이용해 호출된 가장 마지막에 있는 페이지 데이터를 의미합니다.
      // allPages는 useInfiniteQuery를 이용해 호출된 모든 페이지 데이터를 의미합니다.
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < limit) {
          return;
        }
        return lastPage.length + 1;
      },
      // refetchOnWindowFocus: false,
      retry: 1,
      onError: (e) => {
        console.log(e.message);
      },
    });
  return [data, isLoading, isError, fetchNextPage, hasNextPage];
};

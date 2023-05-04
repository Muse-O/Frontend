import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";


export const useGetartgraminfinity = (pageSize = 12) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: keys.GET_ARTGRAM,
      queryFn: async ({ pageParam = 0 }) => {
        const response = await apis_token.get(`/artgram?limit=${pageSize}&offset=${pageParam}`)
        return response.data.artgramList.sortedArtgramList.findArtgrmas;
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

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
};

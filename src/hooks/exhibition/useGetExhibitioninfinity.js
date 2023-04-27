import { useInfiniteQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis, apis_token } from "../../api/apis";

export const useGetExhibitioninfinity = (pageSize, category, HashTag) => {
  const searchCategory =
    category || category !== "" ? `&category=${category}` : "";
  const searchHashTag =
    HashTag || HashTag !== ""
      ? `&tag=%23${HashTag?.map((hashtag) => hashtag.slice(1))}`
      : "";
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [keys.GET_EXHIBITION, category, HashTag],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await apis_token.get(
          `/exhibition?limit=${pageSize}&offset=${pageParam}${searchCategory}${searchHashTag}`
        );
        return res;
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

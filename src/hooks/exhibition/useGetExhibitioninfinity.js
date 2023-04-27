import { useInfiniteQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis, apis_token } from "../../api/apis";

export const useGetExhibitioninfinity = (
  pageSize,
  category,
  HashTag,
  SearchTitle
) => {
  //카테고리
  const searchCategory =
    category && category !== "" ? `&category=${category}` : "";
  //헤시테그
  const searchHashTag =
    HashTag && HashTag.length !== 0
      ? `&tag=%23${HashTag?.map((hashtag) => hashtag.slice(1))}`
      : "";
  //제목검색
  const searchTitle =
    SearchTitle && SearchTitle !== "" ? `&searchTitle=${SearchTitle}` : "";
  //인피니티쿼리
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [keys.GET_EXHIBITION, category, HashTag, SearchTitle],
      queryFn: async ({ pageParam = 0 }) => {
        console.log(
          `/exhibition?limit=${pageSize}&offset=${pageParam}${searchCategory}${searchHashTag}${searchTitle}`
        );
        const res = await apis_token.get(
          `/exhibition?limit=${pageSize}&offset=${pageParam}${searchCategory}${searchHashTag}${searchTitle}`
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

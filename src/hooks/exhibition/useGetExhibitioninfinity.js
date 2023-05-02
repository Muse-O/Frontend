import { useInfiniteQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis, apis_token } from "../../api/apis";

export const useGetExhibitioninfinity = (pageSize, applyTags) => {
  // 위치
  const serchWhere = applyTags.Where ? `&where=${applyTags.Where}` : "";
  //카테고리
  const searchCategory = applyTags.category
    ? `&category=${applyTags.category}`
    : "";
  //헤시테그
  const searchHashTag =
    applyTags.HashTag.length === 0
      ? ""
      : `&tag=%23${applyTags.HashTag?.map((hashtag) => hashtag.slice(1))}`;
  //제목검색
  const searchTitle = applyTags.Search
    ? `&searchTitle=${applyTags.Search}`
    : "";
  //인피니티쿼리
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [keys.GET_EXHIBITION, applyTags],
      queryFn: async ({ pageParam = 0 }) => {
        const res = await apis_token.get(
          `/exhibition?limit=${pageSize}&offset=${pageParam}${serchWhere}${searchCategory}${searchHashTag}${searchTitle}`
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

import { useQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis_token } from "../../api/apis";

export const useGetScrapExhibitionInfo = () => {
  const { data } = useQuery({
    queryKey: keys.GET_SCRAPEXHIBITIONINFO,
    queryFn: async () => {
      const data = await apis_token.get(
        "/mypage/exhibition/scraps?limit=4&offset=0"
      );
      return data.data;
    },
  });
  return {
    ScrapExhibitionInfo: data,
  };
};

import { useQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis_token } from "../../api/apis";

export const useGetScrapArtgramInfo = () => {
  const { data } = useQuery({
    queryKey: keys.GET_SCRAPARTGRAMINFO,
    queryFn: async () => {
      const data = await apis_token.get(
        "/mypage/artgram/scraps?limit=4&offset=0"
      );
      return data.data;
    },
  });
  return { ScrapArtgramInfo: data };
};

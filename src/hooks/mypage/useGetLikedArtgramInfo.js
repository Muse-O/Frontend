import { useQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis_token } from "../../api/apis";

export const useGetLikedArtgramInfo = () => {
  const { data } = useQuery({
    queryKey: keys.GET_LIKEDARTGRAMINFO,
    queryFn: async () => {
      const data = await apis_token.get(
        "/mypage/artgram/likes?limit=4&offset=0"
      );
      //   console.log(data.data, "data");
      return data.data;
    },
  });
  return {
    LikedArtgramInfo: data,
  };
};

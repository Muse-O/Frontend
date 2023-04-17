import { useQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis_token } from "../../api/apis";

export const useGetLikedExhibitionInfo = () => {
  const { data } = useQuery({
    queryKey: keys.GET_LIKEDEXHIBITIONINFO,
    queryFn: async () => {
      const data = await apis_token.get(
        "/mypage/exhibition/likes?limit=5&offset=0"
      );
      //   console.log(data.data, "data");
      return data.data;
    },
  });

  return {
    LikedExhibitionInfo: data,
  };
};

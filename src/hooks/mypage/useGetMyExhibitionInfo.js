import { useQuery } from "@tanstack/react-query";
import { keys } from "../../shared/queryKeys";
import { apis_token } from "../../api/apis";

export const useGetMyExhibitionInfo = () => {
  const { data } = useQuery({
    queryKey: keys.GET_MYEXHIBITIONINFO,
    queryFn: async () => {
      const data = await apis_token.get("/mypage/exhibition?limit=4&offset=0");
      return data.data;
    },
  });
  return {
    MyExhibitionInfo: data,
  };
};

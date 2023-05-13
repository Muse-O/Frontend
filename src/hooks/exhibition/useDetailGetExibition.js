import { useQuery } from "@tanstack/react-query";
import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useDetailGetExibition = (id) => {
  const { data: info, isLoading } = useQuery({
    queryKey: keys.GET_DETAILEXHIBITION,
    queryFn: async () => {
      const res = await apis_token.get(`/exhibition/${id}`);
      return res.data.exhibitionInfo;
    },
    retry: 1,
    onSuccess: (data) => {},
    onError: (e) => {
      console.log("에러", e.message);
    },
  });
  return [info, isLoading];
};

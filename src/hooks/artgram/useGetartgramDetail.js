import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetartgramDetail = (artgramId) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: keys.GET_ARTGRAMDETAIL,
    queryFn: async () => {
      const response = await apis_token.get(`/artgram/${artgramId}`);
      return response.data.datailArtgram.detailArtgram;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (e) => {
      console.log(e.message);
    },
  });
  return [isLoading, isError, data];
};

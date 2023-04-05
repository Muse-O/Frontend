import { useQuery } from "@tanstack/react-query";
import apis from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useGetExhibition = () => {
  const { data, isLoading } = useQuery({
    queryKey: keys.GET_EXHIBITION,
    queryFn: async () => {
      const res = await apis.get("/exhibition");
      return res.data;
    },
  });
  return [data, isLoading];
};

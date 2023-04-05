import { useQuery } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useDetailGetExibition = (id) => {
  console.log("쿼리안에서 실행 id", id);
  const { data, isLoading, isError } = useQuery(keys.GET_EXHIBITION, {
    queryFn: async () => {
      const res = await apis.get(`/exhibition/${id}`);
      return res.data.data;
    },
    retry: 2,
    onSuccess: (data) => {
      console.log("요청성공");
    },
    onError: (e) => {
      console.log("에러", e.message);
    },
  });
  return [data, isLoading, isError];
};

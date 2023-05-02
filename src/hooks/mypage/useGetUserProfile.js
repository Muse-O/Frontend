import { useQuery } from "@tanstack/react-query";
import { keys } from "./../../shared/queryKeys";
import { apis_token } from "../../api/apis";

export const useGetUserProfile = () => {
  const { data } = useQuery({
    queryKey: keys.GET_USERPROFILE,
    queryFn: async () => {
      const data = await apis_token.get("/mypage");
      return data.data;
    },
  });

  return {
    userProfile: data,
  };
};

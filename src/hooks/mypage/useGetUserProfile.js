import { useQuery } from "@tanstack/react-query";
import { keys } from "./../../shared/queryKeys";
import { apis_token } from "../../api/apis";
import { useRecoilValue } from "recoil";
import { decodeNickname } from "../../features/login/loginTokenStore";

export const useGetUserProfile = () => {
  const nickname = useRecoilValue(decodeNickname)
  const { data } = useQuery({
    queryKey: keys.GET_USERPROFILE,
    queryFn: async () => {
      const data = await apis_token.get("/mypage");
      return data.data;
    },
    enabled: !!nickname,
  });

  return {
    userProfile: data,
  };
};

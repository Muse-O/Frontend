import { apis_token } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const postArtgram = async (payload) => {
  const response = await apis_token.post("/artgram", payload);
  return response;
};

export const usePostartgram = () => {
  const queryClient = useQueryClient();
  const { mutate: postArtgrams } = useMutation(postArtgram, {
    onSuccess: (response) => {
      alert(response.data.message);
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
    },
    onError: (err) => {
      alert("글을 저장하지 못했습니다.", err);
    },
  });
  return [postArtgrams];
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { cookies } from '../../shared/cookies'
import { keys } from '../../shared/queryKeys'


const postArtgram = async (payload) => {
  const token = cookies.get('access_token')
  console.log(payload);
  const response = await apis.post("/artgram", payload, {
    headers: {
      Authorization : `Bearer ${token}`
    },
  });
  return response;
};

export const usePostartgram = () => {
  const queryClient = useQueryClient();
  const  { mutate : postArtgrams } = useMutation(postArtgram, {
    onSuccess: (response) => {
      alert(response.data.message);
      queryClient.invalidateQueries(keys.GET_ARTGRAM);
    },
    onError: (err) => {
      alert("글을 저장하지 못했습니다.", err);
    },
  });
  return [postArtgrams]
};
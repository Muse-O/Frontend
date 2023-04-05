import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { cookies } from '../../shared/cookies'
import { keys } from '../../shared/queryKeys'


const postArtgram = async (formData) => {
  const token = cookies.get('access_token')
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }
  const response = await apis.post("/artgram", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization : `Bearer ${token}`
    },
  });
  return response;
};

export const usePostartgram = () => {
  const qureyClient = useQueryClient();
  const  { mutate : postArtgrams } = useMutation(postArtgram, {
    onSuccess: (response) => {
      console.log(response);
      qureyClient.invalidateQueries(keys.GET_ACTGRAM);
    },
    onError: (err) => {
      console.log("글을 저장하지 못했습니다.", err);
    },
  });
  return [postArtgrams]
};
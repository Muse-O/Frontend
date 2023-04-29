import { useMutation } from "@tanstack/react-query"
import { apis } from "../../api/apis"
import { cookies } from "../../shared/cookies";

export const usePostSearchWord = () => {
  
  const {mutate:postSearchWord} = useMutation({
    mutationFn: async(payload) => {
      console.log(payload);
      const token = cookies.get("access_token");
      await apis.post(`/search`, payload, {
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
    },
    onSuccess:() => {
      console.log("검색어 전달 성공");
    },
    onError:() => {
      console.log("검색어 전달 실패");
    }
  })
  return {postSearchWord}
}

// title: string,
// type: artgram or exhibition or user
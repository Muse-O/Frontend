import { apis_token } from "../../api/apis"
import { cookies } from "../../shared/cookies";
import { useMutation } from "@tanstack/react-query"

export const usePostSearchWord = () => {
  
  const {mutate:postSearchWord} = useMutation({
    mutationFn: async(payload) => {
      const token = cookies.get("access_token");
      if(token) {
        await apis_token.post(`/search`, payload)
      }
    },
    onError:(e) => {
      console.log("error", e.message);
    }
  })
  return {postSearchWord}
}
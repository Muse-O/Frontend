import { useMutation } from "@tanstack/react-query"
import { apis_token } from "../api/apis"

export const useReport = () => {
  const {mutate:postReprt} = useMutation({
    mutationFn: async (reportId)=>{
      await apis_token.post('/report', {...reportId})
    },
    onSuccess : () => {
      alert("게시글이 신고되었습니다.")
    },
    onError: () => {
      alert("게시글이 신고되지 않았습니다.")
    }
  })
  return {postReprt}
}
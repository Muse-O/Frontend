import { useQuery } from "@tanstack/react-query"
import { keys } from "../shared/queryKeys"
import { apis_token } from "../api/apis"
import { useRef } from "react"

export const useGetCloudflare = (reqCnt) => {
  const uploadURLRef = useRef([])
  const {isLoading, isError, data} = useQuery({
    queryKey: keys.GET_CLOUDFLARE,
    queryFn: async () => {
      const response = await apis_token.get(`/upload?reqCnt=${reqCnt}`)
      return response.data.urlData

    },
    retry:1,
    refetchOnWindowFocus:false,
    onSuccess: (data) => {
      uploadURLRef.current = data.map(list => list.result.uploadURL)
    },
    onError: (e) => {
      console.log("e", e.message);
    }
  });
  return {isLoading, isError, uploadURLRef: uploadURLRef.current}
}


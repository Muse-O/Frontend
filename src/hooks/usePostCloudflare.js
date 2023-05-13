import { useMutation } from "@tanstack/react-query"
import { apis } from "../api/apis";
import { useRef } from "react";
// import { apis_token } from "../api/apis"

export const usePostCloudflare = () => {
  const tranUrlRef = useRef(null)
  const {mutate:postCloudflare, data} = useMutation({
    mutationFn : async ({uploadURLRef, files}) => {
      const transUrl = []
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file",files[i]);
        const response = await apis.post(uploadURLRef[i], formData);
        transUrl.push(response.data.result.variants[0])
      }
      return transUrl
    }, 
    onSuccess: (data) => {
      console.log("data----------------------", data);
      tranUrlRef.current = data
    }
  })
  return {postCloudflare, tranUrlRef: tranUrlRef.current}
}
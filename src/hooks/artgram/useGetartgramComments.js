import { useQuery } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

export const useGetartgramComments = (artgramId) => {
    
    const {isLoading, isError, data} = useQuery({
      queryKey : keys.GET_ARTGRAMCOMMENTS,
      queryFn : async () => {
        console.log(artgramId);
        const response = await apis.get(`/artgram/${artgramId}/comments`);
        return response.data.comment
      },
      refetchOnWindowFocus: false, 
      retry: 1,
      onSuccess: data  => {
            console.log("getartgramComments 요청 성공", data)
          },
          onError: e => {
            console.log(e.message)
          }
    })
    return [isLoading, isError, data]
}
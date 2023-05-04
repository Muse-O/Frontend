import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetartgramComments = (artgramId) => {
    
    const {isLoading, isError, data} = useQuery({
      queryKey : keys.GET_ARTGRAMCOMMENTS,
      queryFn : async () => {
        const response = await apis.get(`/artgram/${artgramId}/comments`);
        return response.data.comment
      },
      refetchOnWindowFocus: false, 
      retry: 1,
          onError: e => {
            console.log(e.message)
          }
    })
    return [isLoading, isError, data]
}
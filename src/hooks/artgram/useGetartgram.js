import { useQuery } from "@tanstack/react-query";
import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";

const getArtgram = async () => {
  const response = await apis.get("/artgram?limit=10&offset=5");
  return response.data.artgramList.rows 
}

export const useGetartgram = () => {
    const {isLoading, isError, data} = useQuery(keys.GET_ARTGRAM, getArtgram, {
      refetchOnWindowFocus: false, // 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행하는 것이 Default 인데 이를 하지 않겠다고 선언
      retry: 1, // 실패했을 시, 재호출을 몇 번 할 것인지 

      onSuccess: data  => {
        console.log("getArtgram 요청 성공", data)
      },
      onError: e => {
        console.log(e.message)
      }
    })
    return [isLoading, isError, data]
}

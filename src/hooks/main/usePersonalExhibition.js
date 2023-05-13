import { useRef } from "react";
import { apis } from "../../api/apis";
import { keys } from "../../shared/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const usePersonalExhibition = () => {
  const editLists =useRef([]);
  const { isLoading, isError, data } = useQuery({
    queryKey: keys.GET_MAINPERSONALEXHIBITION,
    queryFn: async () => {
      const response = await apis.get(
        "/banner/personal-exhibitions/recent?reqCnt=6" 
      );
      return response.data.exhibitionList.rows;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data) => {
      const editList = [...data];
      const editshiftitem = editList.shift();
      editList.push(editshiftitem);
      editLists.current = editList;
    },
    onError: (e) => {
      console.log(e.message);
    },
  });
  
  
  return { isLoading, isError, data, editLists:editLists.current };
};

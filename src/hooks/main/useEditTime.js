import dayjs from "dayjs";

export const useEditTime = () => {
  const editTimehandle = (times) => {

    return dayjs(times.split("T")[0].replace(/-/g, ".")).format("YY.MM.DD") 
  };
  return {editTimehandle}
}
export const useEditTime = () => {
  const editTimehandle = (times) => {
    return times.split("T")[0].replace("-", ".");
  };
  return {editTimehandle}
}
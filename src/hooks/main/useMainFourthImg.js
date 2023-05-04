import { useEffect, useState } from "react";

export const useMainFourthImg = (data) => {
  const [imgState, setImgState] = useState(null);
  useEffect(() => {
    if (data && data.length > 0) {
      setImgState(data[0].postImage);
    }
  }, [data]);
  return { imgState, setImgState };
};

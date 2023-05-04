import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerStateSearch, headerStatedefalut } from "../components/headerStore";

export const useHeaderState = (location) => {
  const [, setHeaderState] = useRecoilState(headerStatedefalut);
  const headerState = useRecoilValue(headerStateSearch)
  useEffect(() => {
    if(!location) {
      setHeaderState({...headerState})
      return
    } else {
      setHeaderState({ ...headerState, [location]: true });
    }
  }, []);
  return {}
}
import { useRecoilValue } from "recoil";
import { searchDataArtState, searchDataExState, searchDataUserState, searchWordState } from "./seartStore";

export const useUnifiedSearchValue = () => {
  const searchWord = useRecoilValue(searchWordState);
  const searchDataEx = useRecoilValue(searchDataExState)
  const searchDataArt = useRecoilValue(searchDataArtState)
  const searchDataUser = useRecoilValue(searchDataUserState)
  return {searchWord, searchDataEx, searchDataArt, searchDataUser}
}
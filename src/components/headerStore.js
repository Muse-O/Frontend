import { atom } from "recoil";

export const headerStatedefalut = atom({
  key: 'headerStateHanlder',
  default: {
    home:true,
    exhibition:false,
    exhibitionecreate:false,
    artgram:false,
    mypages:false}
});
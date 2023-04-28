import { atom } from "recoil";

export const headerStatedefalut = atom({
  key: 'headerStateHanlder',
  default: {
    home:true,
    exhibition:false,
    artgram:false,
    mypages:false}
});
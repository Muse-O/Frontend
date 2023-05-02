import { atom } from "recoil";

export const headerStatedefalut = atom({
  key: 'headerStateHanlder',
  default: {
    home:false,
    exhibition:false,
    artgram:false,
    mypages:false,
    message:false}
});

export const headerStateSearch = atom({
  key: 'headerStateSearch',
  default: {
    home:false,
    exhibition:false,
    artgram:false,
    mypages:false,
    message:false}
});
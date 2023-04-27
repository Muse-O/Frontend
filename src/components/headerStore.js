import { atom } from "recoil";

export const headerStatedefalut = atom({
  key: 'headerStateHanlder',
  default: {
    home:true,
    exhibition:false,
    artgram:false,
    mypages:false}
});

export const headerHome = atom({
  key: 'headerHome',
  default: true,
});
export const headerEx = atom({
  key: 'headerEx',
  default: false,
});
export const headerArt = atom({
  key: 'headerArt',
  default: false,
});
export const headerMy = atom({
  key: 'headerMy',
  default: false,
});
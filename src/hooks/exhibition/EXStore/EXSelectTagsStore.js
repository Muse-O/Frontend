import dayjs from "dayjs";
import { atom, selector } from "recoil";

//날짜
export const EXSelectWhentore = atom({
  key: "EXSelectWhenStore",
  default: {
    StartDate: dayjs(),
    // EndDate: "",
  },
});
//장소
export const EXSelectWhereStore = atom({
  key: "EXSelectWhereStore",
  default: {
    SelectRegion: "",
    Cities: [],
  },
});
export const EXCities = selector({
  key: "EXCities",
  get: ({ get }) => {
    const { Cities } = get(EXSelectWhereStore);
    return Cities;
  },
});
export const EXSelectRegion = selector({
  key: "EXSelectRegion",
  get: ({ get }) => {
    const { SelectRegion } = get(EXSelectWhereStore);
    return SelectRegion;
  },
});

//카테고리
export const EXSelectCategoryStore = atom({
  key: "EXSelectCategoryStore",
  default: {
    Category: "",
    Checkbox: {
      WK0001: false,
      WK0002: false,
      WK0003: false,
      WK0004: false,
      WK0005: false,
      WK0006: false,
      WK0007: false,
      WK0008: false,
    },
  },
});
export const EXCategoryStoreCheckBox = selector({
  key: "EXCategoryStoreCheckBox",
  get: ({ get }) => {
    const { Checkbox } = get(EXSelectCategoryStore);
    return Checkbox;
  },
});
export const EXCategory = selector({
  key: "EXCategory",
  get: ({ get }) => {
    const { Category } = get(EXSelectCategoryStore);
    return Category;
  },
});
//태그
export const EXSelectHashTagStore = atom({
  key: "EXSelectHashTagStore",
  default: {
    SelectHashTags: [],
    Top10HashTagLists: [],
  },
});
export const EXHashTags = selector({
  key: "EXHashTags",
  get: ({ get }) => {
    const { SelectHashTags } = get(EXSelectHashTagStore);
    return SelectHashTags;
  },
});
// export const EXCategory = selector({
//   key: "EXCategory",
//   get: ({ get }) => {
//     const { Category } = get(EXSelectCategoryStore);
//     return Category;
//   },
// });

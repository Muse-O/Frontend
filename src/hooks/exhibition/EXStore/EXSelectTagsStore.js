import { atom, selector } from "recoil";
import { useGetSido } from "../useGetSido";
//장소

export const EXSelectWhereStore = atom({
  key: "EXSelectWhereStore",
  default: {
    Cities: "",
    SelectRegion: "",
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
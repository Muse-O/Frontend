import { useRecoilState, useRecoilValue } from "recoil";
import {
  EXCategoryStoreCheckBox,
  EXSelectCategoryStore,
} from "../../../../hooks/exhibition/EXStore/EXSelectTagsStore";

export const HeaderCategorys = () => {
  const [categoryStore, setCategoryStore] = useRecoilState(
    EXSelectCategoryStore
  );
  const checkboxes = useRecoilValue(EXCategoryStoreCheckBox);
  const categoryHandler = (code) => {
    setCategoryStore({
      //선택된 카태고리
      Category: code,
      //채크박스 종류와 선택되었는지 아닌지 만들어주는함수
      //나머지는 false로 만듬
      Checkbox: Object.keys(categoryStore.Checkbox).reduce((acc, curr) => {
        acc[curr] = curr === code;
        return acc;
      }, {}),
    });
  };
  return [checkboxes, categoryHandler];
};

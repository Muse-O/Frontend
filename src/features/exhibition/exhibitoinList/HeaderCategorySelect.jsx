import { useRecoilState, useRecoilValue } from "recoil";
import {
  EXCategoryStoreCheckBox,
  EXSelectCategoryStore,
} from "../../../hooks/exhibition/EXStore/EXSelectTagsStore";
import { EXListApplyBox } from "./EXListApplyBox";
import { ExCategoryCode, ExOnOffCode } from "../../../shared/EXCodes";
import * as EXCategory from "./css/exhibitionHeaderCss/EXCategoryCss";
export const HeaderCategorySelect = ({ setSelectedFilter }) => {
  const [categoryStore, setCategoryStore] = useRecoilState(
    EXSelectCategoryStore
  );
  const checkboxes = useRecoilValue(EXCategoryStoreCheckBox);
  const categoryHandler = (e) => {
    const { name, value } = e.target;
    setCategoryStore({
      Category: value,
      Checkbox: Object.keys(categoryStore.Checkbox).reduce((acc, curr) => {
        acc[curr] = curr === name;
        return acc;
      }, {}),
    });
  };

  return (
    <EXCategory.CartegoryBox>
      <EXCategory.PositionBox>
        <EXCategory.CheckBoxContainer>
          <EXCategory.Checkbox type="checkbox" />
          <p>{ExOnOffCode.EK0001}</p>
        </EXCategory.CheckBoxContainer>
        <EXCategory.CheckBoxContainer>
          <EXCategory.Checkbox type="checkbox" />
          <p>{ExOnOffCode.EK0002}</p>
        </EXCategory.CheckBoxContainer>
      </EXCategory.PositionBox>

      <EXCategory.CategoryContainer>
        <EXCategory.CategoryBox>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0001"}
              value={"WK0001"}
              checked={checkboxes.WK0001}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0001}</p>
          </EXCategory.CheckBoxContainer>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0002"}
              value={"WK0002"}
              checked={checkboxes.WK0002}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0002}</p>
          </EXCategory.CheckBoxContainer>
        </EXCategory.CategoryBox>
        <EXCategory.CategoryBox>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0003"}
              value={"WK0003"}
              checked={checkboxes.WK0003}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0003}</p>
          </EXCategory.CheckBoxContainer>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0004"}
              value={"WK0004"}
              checked={checkboxes.WK0004}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0004}</p>
          </EXCategory.CheckBoxContainer>
        </EXCategory.CategoryBox>
        <EXCategory.CategoryBox>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0005"}
              value={"WK0005"}
              checked={checkboxes.WK0005}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0005}</p>
          </EXCategory.CheckBoxContainer>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0006"}
              value={"WK0006"}
              checked={checkboxes.WK0006}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0006}</p>
          </EXCategory.CheckBoxContainer>
        </EXCategory.CategoryBox>
        <EXCategory.CategoryBox>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0007"}
              value={"WK0007"}
              checked={checkboxes.WK0007}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0007}</p>
          </EXCategory.CheckBoxContainer>
          <EXCategory.CheckBoxContainer>
            <EXCategory.Checkbox
              type="checkbox"
              name={"WK0008"}
              value={"WK0008"}
              checked={checkboxes.WK0008}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0008}</p>
          </EXCategory.CheckBoxContainer>
        </EXCategory.CategoryBox>
      </EXCategory.CategoryContainer>
      <EXListApplyBox
        classification={"Category"}
        setSelectedFilter={setSelectedFilter}
      />
    </EXCategory.CartegoryBox>
  );
};

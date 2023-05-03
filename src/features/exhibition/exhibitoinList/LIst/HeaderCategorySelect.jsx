import { EXListApplyBox } from "./EXListApplyBox";
import { ExCategoryCode, ExOnOffCode } from "../../../../shared/EXCodes";
import * as EC from "../css/exhibitionHeaderCss/EXCategoryCss";
import { HeaderCategorys } from "./utils/HeaderCategorys";
export const HeaderCategorySelect = ({ setSelectedFilter }) => {
  //전역 store 체그박스 정보,선택된 카테고리 무엇인지,카테고리를 store에 넣는 함수
  const [checkboxes, categoryHandler] = HeaderCategorys();

  return (
    <EC.CartegoryBox>
      <EC.PositionBox>
        <EC.CheckBoxContainer>
          <EC.Checkbox type="checkbox" />
          <p>{ExOnOffCode.EK0001}</p>
        </EC.CheckBoxContainer>
        <EC.CheckBoxContainer>
          <EC.Checkbox type="checkbox" />
          <p>{ExOnOffCode.EK0002}</p>
        </EC.CheckBoxContainer>
      </EC.PositionBox>

      <EC.CategoryContainer>
        <EC.CategoryBox>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0001"}
              value={"WK0001"}
              checked={checkboxes.WK0001}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0001}</p>
          </EC.CheckBoxContainer>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0002"}
              value={"WK0002"}
              checked={checkboxes.WK0002}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0002}</p>
          </EC.CheckBoxContainer>
        </EC.CategoryBox>
        <EC.CategoryBox>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0003"}
              value={"WK0003"}
              checked={checkboxes.WK0003}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0003}</p>
          </EC.CheckBoxContainer>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0004"}
              value={"WK0004"}
              checked={checkboxes.WK0004}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0004}</p>
          </EC.CheckBoxContainer>
        </EC.CategoryBox>
        <EC.CategoryBox>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0005"}
              value={"WK0005"}
              checked={checkboxes.WK0005}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0005}</p>
          </EC.CheckBoxContainer>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0006"}
              value={"WK0006"}
              checked={checkboxes.WK0006}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0006}</p>
          </EC.CheckBoxContainer>
        </EC.CategoryBox>
        <EC.CategoryBox>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0007"}
              value={"WK0007"}
              checked={checkboxes.WK0007}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0007}</p>
          </EC.CheckBoxContainer>
          <EC.CheckBoxContainer>
            <EC.Checkbox
              type="checkbox"
              name={"WK0008"}
              value={"WK0008"}
              checked={checkboxes.WK0008}
              onClick={categoryHandler}
            />
            <p>{ExCategoryCode.WK0008}</p>
          </EC.CheckBoxContainer>
        </EC.CategoryBox>
      </EC.CategoryContainer>
      <EXListApplyBox
        classification={"Category"}
        setSelectedFilter={setSelectedFilter}
      />
    </EC.CartegoryBox>
  );
};

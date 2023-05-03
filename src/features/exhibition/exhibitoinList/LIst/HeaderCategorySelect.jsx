import { EXListApplyBox } from "./EXListApplyBox";
import { ExCategoryCode, ExOnOffCode } from "../../../../shared/EXCodes";
import * as EC from "../css/exhibitionHeaderCss/EXCategoryCss";
import { HeaderCategorys } from "./utils/HeaderCategorys";
import { CategoryCheckBox } from "./HeaderCategoryCheckBox";
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
          <CategoryCheckBox
            code={"WK0001"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
          <CategoryCheckBox
            code={"WK0002"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
        </EC.CategoryBox>
        <EC.CategoryBox>
          <CategoryCheckBox
            code={"WK0003"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
          <CategoryCheckBox
            code={"WK0004"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
        </EC.CategoryBox>
        <EC.CategoryBox>
          <CategoryCheckBox
            code={"WK0005"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
          <CategoryCheckBox
            code={"WK0006"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
        </EC.CategoryBox>
        <EC.CategoryBox>
          <CategoryCheckBox
            code={"WK0007"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
          <CategoryCheckBox
            code={"WK0008"}
            checkboxes={checkboxes}
            categoryHandler={categoryHandler}
          />
        </EC.CategoryBox>
      </EC.CategoryContainer>
      <EXListApplyBox
        classification={"Category"}
        setSelectedFilter={setSelectedFilter}
      />
    </EC.CartegoryBox>
  );
};

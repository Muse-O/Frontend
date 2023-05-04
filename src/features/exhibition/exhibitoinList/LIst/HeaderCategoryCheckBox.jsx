import { ExCategoryCode } from "../../../../shared/EXCodes";
import * as EC from "../css/exhibitionHeaderCss/EXCategoryCss";
export const CategoryCheckBox = ({ code, checkboxes, categoryHandler }) => {
  return (
    <EC.CheckBoxContainer onClick={() => categoryHandler(code)}>
      <EC.Checkbox type="checkbox" checked={checkboxes[code]} />
      <p>{ExCategoryCode[code]}</p>
    </EC.CheckBoxContainer>
  );
};

import { ExCategoryCode } from "../../../../shared/EXCodes";
import * as EC from "../css/exhibitionHeaderCss/EXCategoryCss";
export const CategoryCheckBox = ({ code, checkboxes, categoryHandler }) => {
  return (
    <EC.CheckBoxContainer>
      <EC.Checkbox
        type="checkbox"
        name={code}
        value={code}
        checked={checkboxes[code]}
        onClick={categoryHandler}
      />
      <p>{ExCategoryCode[code]}</p>
    </EC.CheckBoxContainer>
  );
};

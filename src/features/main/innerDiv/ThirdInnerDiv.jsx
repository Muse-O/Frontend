import { useEditTime } from "../../../hooks/main/useEditTime";
import * as Main from "../css/mainparts";

export const ThirdInnerDiv = ({list}) => {
  const { editTimehandle } = useEditTime();
  return (
    <>
      <Main.ThirdNum>{list.index}</Main.ThirdNum>
      <Main.ThirdImg
        children={<img src={list.postImage} alt="인기순 전시" />}
      />
      <Main.ThirdInfo>
        <p className="titleKo">{list.exhibitionTitle}</p>
        <p className="titleEn">{list.exhibitionEngTitle}</p>
        <p className="location">
          {`${editTimehandle(list.startDate)} - ${editTimehandle(
            list.endDate
          )}`}
        </p>
      </Main.ThirdInfo>
    </>
  );
};
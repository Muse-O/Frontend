import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import { EXApplyTagsStore } from "../../../hooks/exhibition/EXStore/EXApplyTagsStore";
import {
  EXCategory,
  EXHashTags,
  EXSelectCategoryStore,
  EXSelectRegion,
} from "../../../hooks/exhibition/EXStore/EXSelectTagsStore";
import refresh from "../../../assets/imgs/refresh.png";
import { Apply, ResetImg } from "./css/exhibitionTagCss/EXTagCss";
export const EXListApplyBox = ({
  // 해시태그
  setHashTagStore,
  top10TagsData,
  // 장소
  setWhereStore,
  sido,
  //취소버튼
  setSelectedFilter,
  //종류 확인
  classification,
}) => {
  // const [_, setApplyTags] = useRecoilState(EXApplyTagsStore);
  const setApplyTags = useSetRecoilState(EXApplyTagsStore);
  const resetCategory = useResetRecoilState(EXSelectCategoryStore);
  const Category = useRecoilValue(EXCategory);
  const SelectRegion = useRecoilValue(EXSelectRegion);
  const HashTags = useRecoilValue(EXHashTags);
  const apply = () => {
    classification === "Category" &&
      setApplyTags((pre) => {
        return {
          ...pre,
          category: Category,
        };
      });
    classification === "HashTag" &&
      setApplyTags((pre) => {
        return {
          ...pre,
          HashTag: HashTags,
        };
      });
    if (classification === "Where") {
      const replaceCityName = (addressString) => {
        const cities = [
          ["서울특별시", "서울"],
          ["부산광역시", "부산"],
          ["대구광역시", "대구"],
          ["인천광역시", "인천"],
          ["광주광역시", "광주"],
          ["대전광역시", "대전"],
          ["울산광역시", "울산"],
          ["세종특별자치시", "세종"],
          ["경기도", "경기"],
          ["강원도", "강원"],
          ["충청북도", "충북"],
          ["충청남도", "충남"],
          ["전라북도", "전북"],
          ["전라남도", "전남"],
          ["경상북도", "경북"],
          ["경상남도", "경남"],
          ["제주특별자치도", "제주"],
        ];
        let replacedString = addressString;
        for (let city of cities) {
          const regex = new RegExp(city[0], "g");
          replacedString = replacedString.replace(regex, city[1]);
        }
        return replacedString;
      };
      const where = replaceCityName(SelectRegion);
      setApplyTags((pre) => {
        return {
          ...pre,
          Where: where,
        };
      });
    }
  };
  const reset = () => {
    if (classification === "Category") {
      resetCategory();
      setApplyTags((pre) => {
        return {
          ...pre,
          category: "",
        };
      });
    }
    if (classification === "HashTag") {
      const updatedTo10TAGS = top10TagsData.map((tag) => {
        return { tagName: tag.tagName, checked: false };
      });
      // setTop10TagLists(updatedTo10TAGS);
      setHashTagStore((pre) => {
        return {
          SelectHashTags: [],
          Top10HashTagLists: updatedTo10TAGS,
        };
      });
      setApplyTags((pre) => {
        return {
          ...pre,
          HashTag: "",
        };
      });
    }
    if (classification === "Where") {
      setWhereStore((pre) => {
        return { ...pre, SelectRegion: "", Cities: sido };
      });
      setApplyTags((pre) => {
        return {
          ...pre,
          Where: "",
        };
      });
    }
  };
  const cancle = () => {
    classification === "Category" && setSelectedFilter("");
    classification === "HashTag" && setSelectedFilter("");
    classification === "Where" && setSelectedFilter("");
  };
  return (
    <ApplyContainer>
      <ApplyResetBox onClick={reset}>
        <Apply>초기화</Apply>
        <ResetImg src={refresh} />
      </ApplyResetBox>
      <ApllyBox>
        <div onClick={cancle}>
          <Apply>취소</Apply>
        </div>
        <div onClick={apply}>
          <Apply>적용하기</Apply>
        </div>
      </ApllyBox>
    </ApplyContainer>
  );
};

const ApplyResetBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  :hover {
    background: linear-gradient(180deg, #3360ff 0%, #b960ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;
const ApllyBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 7px;
`;
const ApplyContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 24px 20px 24px;
  border-top: 1px solid #eeeeee;
  span {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
`;

import { EXListApplyBox } from "./EXListApplyBox";
import * as EXHashTag from "../css/exhibitionHeaderCss/EXHashTagCss";
import {
  TagButton,
  TagText,
  XBox,
} from "../css/exhibitionHeaderCss/EXWhereCss";
import { HeaderHashTags } from "./utils/HeaderHashTags";
import { useGetTop10Tags } from "../../../../hooks/exhibition/useGetTop10Tags";
export const HeaderTagSelect = () => {
  //api통신으로 받아온값
  const [top10TagsData] = useGetTop10Tags();
  //통신값을 받아온 걸 활용해서 전역 store, 전역 hashtagstore값을 받아오고, 그값을 선택하거나 삭제하는함수
  const [hashTagStore, setHashTagStore, filterTags, deleteTags] =
    HeaderHashTags(top10TagsData);
  return (
    <EXHashTag.TagContainer>
      <EXHashTag.TagBox>
        <div>
          <EXHashTag.TagRecomendTitle>인기태그 추천</EXHashTag.TagRecomendTitle>
        </div>
        <EXHashTag.RecomendTagContainer>
          {hashTagStore.Top10HashTagLists?.map((tag) => {
            return (
              <EXHashTag.RecomendTag
                key={tag.tagName}
                onClick={filterTags}
                checked={tag.checked}
              >
                {tag.tagName}
              </EXHashTag.RecomendTag>
            );
          })}
        </EXHashTag.RecomendTagContainer>
        <EXHashTag.SelectTagContainer>
          {hashTagStore.SelectHashTags.map((tag) => {
            return (
              <TagButton>
                <TagText>{tag}</TagText>
                <XBox onClick={deleteTags} name={tag}>
                  x
                </XBox>
              </TagButton>
            );
          })}
        </EXHashTag.SelectTagContainer>
      </EXHashTag.TagBox>
      <EXListApplyBox
        classification={"HashTag"}
        setHashTagStore={setHashTagStore}
        top10TagsData={top10TagsData}
      />
    </EXHashTag.TagContainer>
  );
};

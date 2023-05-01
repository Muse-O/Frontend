import { useRecoilState } from "recoil";
import { useGetTop10Tags } from "../../../hooks/exhibition/useGetTop10Tags";
import { EXSelectHashTagStore } from "../../../hooks/exhibition/EXStore/EXSelectTagsStore";
import { useEffect } from "react";
import { EXListApplyBox } from "./EXListApplyBox";
import * as EXHashTag from "./css/exhibitionHeaderCss/EXHashTagCss";
import { TagButton, TagText, XBox } from "./css/exhibitionHeaderCss/EXWhereCss";
export const HeaderTagSelect = ({ setSelectedFilter }) => {
  const [top10TagsData] = useGetTop10Tags();
  const [hashTagStore, setHashTagStore] = useRecoilState(EXSelectHashTagStore);
  useEffect(() => {
    if (top10TagsData) {
      const updatedTo10TAGS = top10TagsData.map((tag) => {
        return { tagName: tag.tagName, checked: false };
      });

      setHashTagStore((pre) => {
        return {
          ...pre,
          Top10HashTagLists: updatedTo10TAGS,
        };
      });
    }
  }, [top10TagsData]);

  //이거 where카테고리랑 같이쓰임 나중에 리팩토링시 분리 필요
  const filterTags = (e) => {
    const { innerText } = e.target;
    setHashTagStore((pre) => {
      const newTop10HashTagLists = pre.Top10HashTagLists.map((tag) => {
        if (tag.tagName === innerText) {
          return { ...tag, checked: !tag.checked };
        } else {
          return { ...tag, checked: false };
        }
      });

      const newSelectHashTags =
        pre.SelectHashTags[0] === innerText ? [] : [innerText];

      return {
        ...pre,
        SelectHashTags: newSelectHashTags,
        Top10HashTagLists: newTop10HashTagLists,
      };
    });
  };
  const deleteTags = (e) => {
    const name = e.currentTarget.getAttribute("name");
    setHashTagStore((pre) => {
      const newSelectHashTags = pre.SelectHashTags.filter(
        (tag) => tag !== name
      );
      const newTop10HashTagLists = pre.Top10HashTagLists.map((tag) => {
        if (tag.tagName === name) {
          return { ...tag, checked: false };
        } else {
          return { ...tag };
        }
      });
      return {
        ...pre,
        SelectHashTags: newSelectHashTags,
        Top10HashTagLists: newTop10HashTagLists,
      };
    });
  };

  return (
    <EXHashTag.TagContainer>
      <EXHashTag.TagBox>
        <input placeholder="태그 검색" />
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
        setSelectedFilter={setSelectedFilter}
        top10TagsData={top10TagsData}
      />
    </EXHashTag.TagContainer>
  );
};

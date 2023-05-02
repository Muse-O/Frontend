import styled from "styled-components";
import {
  EXSelectCategoryStore,
  EXSelectHashTagStore,
  EXSelectWhereStore,
} from "../../../hooks/exhibition/EXStore/EXSelectTagsStore";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useGetTop10Tags } from "../../../hooks/exhibition/useGetTop10Tags";
import { useGetSido } from "../../../hooks/exhibition/useGetSido";
import { EXApplyTagsStore } from "../../../hooks/exhibition/EXStore/EXApplyTagsStore";
import { ExCategoryCode } from "../../../shared/EXCodes";
import * as Tags from "./css/exhibitionTagCss/EXTagCss";
import refresh from "../../../assets/imgs/refresh.png";
export const EXTags = ({ applyTags, setApplyTags }) => {
  const resetCategory = useResetRecoilState(EXSelectCategoryStore);
  const [top10TagsData] = useGetTop10Tags();
  const [hashTagStore, setHashTagStore] = useRecoilState(EXSelectHashTagStore);
  const [WhereStore, setWhereStore] = useRecoilState(EXSelectWhereStore);
  const resetApplyTags = useResetRecoilState(EXApplyTagsStore);
  const [sido] = useGetSido();
  let applys = [
    { id: "Where", value: applyTags.Where },
    { id: "Category", value: ExCategoryCode[applyTags.category] },
    { id: "HashTag", value: applyTags.HashTag },
    { id: "Search", value: applyTags.Search },
  ];
  const resetTag = () => {
    resetApplyTags();
    //카테고리

    resetCategory();
    setApplyTags((pre) => {
      return {
        ...pre,
        category: "",
      };
    });
    //헤시태그
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
    //장소
    setWhereStore((pre) => {
      return { ...pre, SelectRegion: "", Cities: sido };
    });
    setApplyTags((pre) => {
      return {
        ...pre,
        Where: "",
      };
    });
  };
  //리코일
  const deleteTag = (id) => {
    setApplyTags((pre) => {
      return {
        ...pre,
        [id]: "",
      };
    });
    if (id === "Category") {
      resetCategory();
      setApplyTags((pre) => {
        return {
          ...pre,
          category: "",
        };
      });
    }
    if (id === "HashTag") {
      const updatedTo10TAGS = top10TagsData.map((tag) => {
        return { tagName: tag.tagName, checked: false };
      });
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
    if (id === "Where") {
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
  return (
    <Tags.EXTag>
      {applys.filter((apply) => apply.value !== undefined && apply.value !== "")
        .length > 0 && (
        <>
          {applys
            .filter((apply) => apply.value !== undefined && apply.value !== "")
            .map((apply) => (
              <Tags.TagButton key={apply.id}>
                <Tags.TagText>{apply.value}</Tags.TagText>
                <Tags.XBox name={apply.id} onClick={() => deleteTag(apply.id)}>
                  x
                </Tags.XBox>
              </Tags.TagButton>
            ))}
          <Tags.ApplyResetBox onClick={resetTag}>
            <span>초기화</span>
            <Tags.ResetImg src={refresh} />
          </Tags.ApplyResetBox>
        </>
      )}
    </Tags.EXTag>
  );
};

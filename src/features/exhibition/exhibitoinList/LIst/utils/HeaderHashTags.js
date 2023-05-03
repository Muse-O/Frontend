import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { EXSelectHashTagStore } from "../../../../../hooks/exhibition/EXStore/EXSelectTagsStore";

export const HeaderHashTags = (top10TagsData) => {
  //리코일값 불러오기
  const [hashTagStore, setHashTagStore] = useRecoilState(EXSelectHashTagStore);
  //태그들을 불러와서 값을 전역스토어에 넣기.
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
  //선택된 값만 켜지도록 만듬 그리고 그 값을 statage시킴
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

  //stage된 값을 이름을 찾아서 check를 풀어주고 그 값을  다시 store를 설정해준다.
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

  return [hashTagStore, filterTags, deleteTags, setHashTagStore];
};

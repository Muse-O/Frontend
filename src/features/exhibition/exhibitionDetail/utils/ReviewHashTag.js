import { useState } from "react";

export const ReviewHashTag = () => {
  const [inputHashTag, setInputHashTag] = useState("");
  const [hashTag, setHashTags] = useState([]);
  const hashTaghandler = (e) => {
    const { value } = e.target;
    setInputHashTag(value);
  };
  const upKeyPress = (e) => {
    const { value } = e.target;
    if (value.length !== 0 && e.key === "Enter") {
      if (hashTag.length > 4) {
        alert("해시태그는 5개 까지 입력가능합니다");
        return;
      }
      let updatedHash = value.trim();
      const regExp = /[\{\}\[\]\/?.;,:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
      if (regExp.test(updatedHash)) {
        alert("태그 내부에 특수문자는 불가능 합니다");
        return;
      }
      if (updatedHash === "") return;
      setHashTags((pre) => {
        return [...pre, `#${updatedHash}`];
      });

      setInputHashTag("");
    }
  };
  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = hashTag.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setHashTags(filteredTagList);
  };
  return [
    hashTag,
    setHashTags,
    inputHashTag,
    setInputHashTag,
    hashTaghandler,
    upKeyPress,
    deleteTagItem,
  ];
};

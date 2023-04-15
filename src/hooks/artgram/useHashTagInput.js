import { useEffect, useState } from "react";

export const useHashTagInput = (inputValue,setInputValue,hashTag, setHashTag) => {
  // console.log("useHashTagInput", inputValue);
  // const [inputValue, setInputValue] = useState("");

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newHashTag = inputValue.trim();
      console.log("newHashTag 중복확인 검사이전", newHashTag);
      if(newHashTag && !hashTag.includes(newHashTag)) {
        console.log("newHashTag 중복확인 검사이후", newHashTag);
        setHashTag([...hashTag, newHashTag]);
        setInputValue('')
      } 
    }
  };

  const handleRemoveHashTag = (hashTagOne) => {
    setHashTag(hashTag.filter((tag) => tag !== hashTagOne));
  };
  return {handleInputKeyDown, handleRemoveHashTag}
}
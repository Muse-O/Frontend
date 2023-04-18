import { useEffect, useState } from "react";

export const useHashTagInput = (inputValue,setInputValue,hashTag, setHashTag) => {
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newHashTag = inputValue.trim();
      console.log("newHashTag 중복확인 검사이전", newHashTag);
      if(newHashTag && !hashTag.includes(newHashTag)) {
        setHashTag([...hashTag, newHashTag]);
        setInputValue('')
      } else {
        setInputValue('')
      }
      
    }
  };

  const handleRemoveHashTag = (hashTagOne) => {
    setHashTag(hashTag.filter((tag) => tag !== hashTagOne));
  };
  return {handleInputKeyDown, handleRemoveHashTag}
}
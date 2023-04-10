import { useEffect, useState } from "react";

export const useHashTagInput = (hashTag, setHashTag) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const newHashTag = inputValue.trim();
      if (newHashTag && !hashTag.includes(newHashTag)) {
        setHashTag([...hashTag, newHashTag]);
        setInputValue("");
      } 
    }
    
  };
  // useEffect(()=>{
  //   console.log(hashTag);
  // },[hashTag])

  const handleRemoveHashTag = (hashTagOne) => {
    setHashTag(hashTag.filter((tag) => tag !== hashTagOne));
  };
  return {inputValue, handleInputChange, handleInputKeyDown, handleRemoveHashTag}
}
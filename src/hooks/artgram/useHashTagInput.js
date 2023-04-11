import { useEffect, useState } from "react";

export const useHashTagInput = (hashTag, setHashTag) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
    // if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      const newHashTag = inputValue.trim();
      //  const newHashTag = inputValue.trim().normalize("NFC");
      if (newHashTag && !hashTag.includes(newHashTag)) {
        setHashTag([...hashTag, newHashTag]);
        setInputValue("");
      } 
    }
  };
  // const handleInputKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     const newHashTag = inputValue.trim().normalize("NFC");
  //     const isDuplicate = hashTag.some(tag => tag === newHashTag);
  //     if (newHashTag && !isDuplicate) {
  //       const newTags = [...hashTag, newHashTag];
  //       setHashTag(newTags);
  //       setInputValue("");
  //     } 
  //   }
  // };


  useEffect(()=>{
    console.log(hashTag);
  },[hashTag])

  const handleRemoveHashTag = (hashTagOne) => {
    setHashTag(hashTag.filter((tag) => tag !== hashTagOne));
  };
  return {inputValue, handleInputChange, handleInputKeyDown, handleRemoveHashTag}
}
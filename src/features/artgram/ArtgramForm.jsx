import React from "react";
import { createArtgramInputList } from "../forms/inputlist";
import { useFormInput } from "../../hooks/useFormInput";
import { Input } from "../../components/Input";
import { Flex } from "../../components/Flex";
import { usePostartgram } from "../../hooks/artgram/usePostartgram";
import { useImg } from "../../hooks/artgram/useImg";
import ArtgramShowimg from "./ArtgramShowimg";
import ArtgramInp from "./ArtgramInp";

function ArtgramForm() {
  // 비동기 통신을 위하 커스텀 훅(리액트 쿼리)
  const [postArtgrams] = usePostartgram(); 
  // Form의 input의 상태를 관리할 커스텀 훅
  const [formState, setFormState, handleInputChange] = useFormInput(); 
  // Form의 input(img)를 관리하기 위한 커스텀 훅
  const [uploadimg, setUploadImg, selectFile, saveImgFile, deleteImage] = useImg(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    const { artgramTitle, artgramDesc } = formState;
    const formData = new FormData();
    formData.append("artgramTitle", artgramTitle);
    formData.append("artgramDesc", artgramDesc);
    formData.append("imgUrl", uploadimg);
    postArtgrams(formData);
    setFormState({});
    setUploadImg("");
    selectFile.current.value = "";
  };

  return (
    <>
      <Flex as="form" onSubmit={handleSubmit} fd="column" gap="10">
        {createArtgramInputList.map((input, index) => (
          <Input
            key={index}
            label={input.label}
            inputProps={{
              type: input.type,
              name: input.name,
              value: formState[input.name] || "",
              onChange: handleInputChange,
            }}
          />
        ))}
        <ArtgramInp selectFile={selectFile} onChange={saveImgFile}/>
        <input type="submit" value="등록하기" />
      </Flex>
      <Flex fw="wrap" gap="23">
        {uploadimg &&
          uploadimg.map((img, index) => (
            <ArtgramShowimg key={index} img={img} index={index} onCilck={deleteImage} />
          ))}
      </Flex>
    </>
  );
}

export default ArtgramForm;

// img reader 관련 ////////////////////////////////////////////////////////////////////////
// const images = [];
// files.forEach((file) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onloadend = () => {
//     images.push(reader.result);
//     if (images.length === files.length) {
//       setUploadImg(images);
//     }
//   };
// });

// GPT가 리펙토링해준 코드이다.
// 아래의 코드는 Promise 객체를 통해서 비동기적으로 처리하고, 내용을 완수했을 때 돌아옴으로 안전하게 데이터를 관리할 수 있게 된다.

// input img 등록 관련 ////////////////////////////////////////////////////////////////////////
// {/* <input
// style={{ display: "none" }}
// ref={selectFile}
// type="file"
// onChange={saveImgFile}
// multiple
// accept="image/*"
// />
// <button type="button" onClick={imgBtnhandle}>
// 사진등록
// </button> */}
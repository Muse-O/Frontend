import React, { useRef, useState } from "react";
import { createArtgramInputList } from "../forms/inputlist";
import { useFormInput } from "../../hooks/useFormInput";
import { Input } from "../../components/Input";
import { Flex } from "../../components/Flex";
import { usePostartgram } from "../../hooks/artgram/usePostartgram";

function ArtgramForm() {
  const [uploadimg, setUploadImg] = useState("");
  const selectFile = useRef("");

  const [postArtgrams] = usePostartgram()
  const handleFileChange = () => {
    const files = Array.from(selectFile.current.files);
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
    const promises = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });
    Promise.all(promises).then(images => {
      setUploadImg(images);
    });
  };

  const handleDeleteImage = (event) => {
    const index = parseInt(event.target.dataset.index);
    const newImages = [...uploadimg];
    newImages.splice(index, 1);
    setUploadImg(newImages);
  };

  const [formState, setFormState, handleInputChange] = useFormInput();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(uploadimg)
    const {artgramTitle, artgramDesc} =  formState
    const formData = new FormData()
    formData.append("artgramTitle", artgramTitle)
    formData.append("artgramDesc",artgramDesc)
    formData.append("imgUrl",uploadimg)
    postArtgrams(formData)
    setFormState({});
    setUploadImg('')
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
        <input
          style={{display:"none"}}
          ref={selectFile}
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
        <button
              type='button'
              className="photoSelector"
              onClick={() => selectFile.current.click()}
            >
              사진등록
            </button>
        <input type="submit" value="등록하기" />
      </Flex>

      <Flex fw="wrap" gap="23">
      {uploadimg &&
        uploadimg.map((img, index) => (
          <div key={`image${index}`} style={{ position: "relative", margin: "20px 0" }}>
            <img src={img} alt="업로드이미지" width="235px" />
            <div style={{ position: "absolute", top: "0", right: "0" }}>
                  <button
                    onClick={handleDeleteImage}
                    data-index={index}
                  >
                    삭제
                  </button>
                </div>
          </div>
        ))}
      </Flex>
    </>
  );
}

export default ArtgramForm;

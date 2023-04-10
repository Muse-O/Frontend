import React, { useEffect, useState } from "react";
import { createArtgramInputList } from "../forms/inputlist";
import { useFormInput } from "../../hooks/useFormInput";
import { HashTagInput, Input } from "../../components/Input";
import { Flex } from "../../components/Flex";
import { usePostartgram } from "../../hooks/artgram/usePostartgram";
import { MdOutlineFileDownload } from 'react-icons/md'
import * as ArtgramFormparts from './ArtgramFormImgparts'
import { useDropzoneinput } from "../../hooks/artgram/useDropzoneinput";
import { useGetimgurl } from "../../hooks/artgram/useGetimgurl";


function ArtgramForm() {
  // 비동기 통신을 위하 커스텀 훅(리액트 쿼리)  ------------------------------------------------------------------ //
  const [postArtgrams] = usePostartgram();

  // Form의 input state 관리(제목과 내용, 그리고 해시태그)
  const [formState, setFormState, handleInputChange] = useFormInput();
  const [hashTag, setHashTag] = useState([]);

  // Drag&Drop files state 관리 및 화면에 미리보기 제어   ----------------------------------------------------- //
  const [files, setFiles, getRootProps, getInputProps] = useDropzoneinput()
  useEffect(() => {
    // 마운트 해제시, 데이터 url 취소
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  // Drag&Drop state(files)를 AWS S3에 업로드하여 url 받아내고, newImageUrls state에 입력하기   ---------------- //
  const [s3imgurlhandle] = useGetimgurl(files)

  const handleSubmit = (event) => {
    event.preventDefault();
    const { artgramTitle, artgramDesc } = formState;
    const newImageUrls = s3imgurlhandle();
    postArtgrams({ artgramTitle, artgramDesc, hashTag, imgUrl: newImageUrls });
    setFiles([]);
    setFormState({});
  };
  // -------------------------------------------------------------------------------------------------- //
  return (
    <>
      <Flex as="form" onSubmit={handleSubmit} fd="column" gap="10">
        {/* input:Atom을 활용한 molecule --------------------------------------------------------------- */} 
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
        <HashTagInput
          label="해시태그"
          hashTag={hashTag}
          setHashTag={setHashTag}
        />
        {/* dropzone 라이브러리를 활용한 type:file 업로드 -------------------------------------------------- */}
        <ArtgramFormparts.Section {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <ArtgramFormparts.DragIcon>
            <MdOutlineFileDownload />
          </ArtgramFormparts.DragIcon>
          <ArtgramFormparts.DragText>
            Drag & drop some files here, or click to select files
          </ArtgramFormparts.DragText>
        </ArtgramFormparts.Section>
        {/* dropzone 라이브러리를 활용, 업로드된 이미지에 대한 미리보기 ------------------------------------------- */}
        <ArtgramFormparts.ThumbsContainer>
          {files &&
            files.map((file) => (
              <ArtgramFormparts.Thumb key={file.name}>
                <ArtgramFormparts.ThumbInner>
                  <ArtgramFormparts.Thumbimg
                    src={file.preview}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                </ArtgramFormparts.ThumbInner>
              </ArtgramFormparts.Thumb>
            ))}
        </ArtgramFormparts.ThumbsContainer>
        {/* form 태그의  submit 버든 -------------------------------------------------------------------- */}
        <input type="submit" value="등록하기" disabled={files.length === 0}/>
      </Flex>
    </>
  );
}

export default ArtgramForm;

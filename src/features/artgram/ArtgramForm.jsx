import React, { useEffect, useState } from "react";
import { createArtgramInputList } from "../forms/inputlist";
import { useFormInput } from "../../hooks/useFormInput";
import { Input } from "../../components/Input";
import { Flex } from "../../components/Flex";
import { usePostartgram } from "../../hooks/artgram/usePostartgram";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileDownload } from 'react-icons/md'
import styled from 'styled-components';


function ArtgramForm() {
  // 비동기 통신을 위하 커스텀 훅(리액트 쿼리)
  const [postArtgrams] = usePostartgram();
  // Form의 input의 상태를 관리할 커스텀 훅
  const [formState, setFormState, handleInputChange] = useFormInput();
  // Form의 input(img)를 관리하기 위한 커스텀 훅
  
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { artgramTitle, artgramDesc } = formState;
    const formData = new FormData();
    formData.append("artgramTitle", artgramTitle);  // string
    formData.append("artgramDesc", artgramDesc);    // string
    formData.append("imgUrl", acceptedFiles);           // [Array]
    postArtgrams(formData);
    setFormState({});
  };



  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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

        {/* <section className="container"> */}
        <Section {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <DragIcon><MdOutlineFileDownload/></DragIcon>
            <DragText>Drag 'n' drop some files here, or click to select files</DragText>
        </Section>
        <aside style={thumbsContainer}>{thumbs}</aside>
        <input type="submit" value="등록하기" />
      </Flex>
      
    </>
  );
}

export default ArtgramForm;

const Section = styled.section`
  width: 100%;
  min-height: 110px;
  border: 2px dotted gray;
  border-radius: 8px;
  padding: 18px;
  text-align: center;
`

const DragText = styled.div`
  font-size: 1.3rem;
`

const DragIcon = styled.div`
  width: 100px;
  height: 40px;
  margin: 0 auto;
  font-size: 3rem;
`

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
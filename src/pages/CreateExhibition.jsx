import React, { useState } from "react";
import { Article } from "../shared/GlobalStyled";
import Header from "../components/Header";
import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";

function CreateExhibition() {
  const [exhibition, setExhibition] = useState({
    address: "",
    zonecode: "",
  });

  const open = useDaumPostcodePopup(process.env.REACT_APP_KAKAO_ADDRESS_URL);

  const handleComplete = (data) => {
    // let fullAddress = data.address;
    // let extraAddress = "";
    // if (data.addressType === "R") {
    //   if (data.bname !== "") {
    //     extraAddress += data.bname;
    //   }
    //   if (data.buildingName !== "") {
    //     extraAddress +=
    //       extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    //   }
    //   fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    // }
    setExhibition((old) => {
      return { ...old, address: data.address, zonecode: data.zonecode };
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  console.log("exhibition", exhibition);
  return (
    <>
      <Header />
      <Article>
        <Box>
          <h1>작성구역. 카카오 지도 api가지고 오기</h1>
          <button type="button" onClick={handleClick}>
            지도
          </button>
          <input value={exhibition.address} readonly placeholder="주소" />
          <input value={exhibition.zonecode} readonly placeholder="우편번호" />
        </Box>
      </Article>
    </>
  );
}

export default CreateExhibition;

const Box = styled.div`
  background-color: #b3f1ae;
  margin: 50px;
  padding: 50px;
`;

import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import React, { useState } from "react";
import { usePostExhibition } from "../../hooks/exhibition/usetPostExhibition";

//Todo넣어야 하는 데이터.
//* startDate: “2023-04-01”,
//* endDate: “2023-04-30”,
//* exhibitionTitle:”제목”,
//*postImage: 썸네일(포스터)URL
//*artImage: [ { order: “1”, imgUrl: 이미지URL, imgCaption: 이미지 내용 }, { order: “2”, imgUrl: 이미지URL, imgCaption: 이미지 내용 },]
//*exhibitionDesc:”상세내용”
//*exhibitionCode: “ES000001(개인전)”
//*entranceFee: “2,000(가격)”
//*artWorkCnt:”29(작품수)”
//*agencyAndsponsor:”(스폰서)”
//*location: “장소”,
//*contact: “01000000000”
//*authors: [{ order: “1”, author: “김재란”},{ order: “2”, author: ”백승호”},]
//*exhibitionCategoty: [“WK0001”, “WK0002”(전시 카테고리 - 애니메이션)]

function ExhibitionForm() {
  const [exhibition, setExhibition] = useState({
    startDate: "2023-04-07",
    endDate: "2023-04-08",
    exhibitionTitle: "제목",
    postImage: "URL",
    artImage: [
      { order: "1", imgUrl: "이미지URL", imgCaption: "이미지 내용" },
      { order: "2", imgUrl: "이미지URL", imgCaption: "이미지 내용" },
    ],
    exhibitionDesc: "상세내용",
    exhibitionCode: "ES000001",
    entranceFee: "2,000",
    artWorkCnt: "29",
    agencyAndsponsor: "",
    location: "상세장소",
    contact: "01000000000",
    authors: [
      { order: "1", author: "김재란" },
      { order: "2", author: "백승호" },
    ],
    exhibitionCategoty: ["WK0001", "WK0002"],
    detailLocation: {
      zonecode: "",
      address: "",
      addressEnglish: "",
      addressType: "",
      buildingName: "",
      buildingCode: "",
      roadAddress: "",
      roadAddressEnglish: "",
      autoJibunAddress: "",
      autoJibunAddressEnglish: "",
      roadname: "",
      roadnameCode: "",
      roadnameEnglish: "",
    },
  });

  const open = useDaumPostcodePopup(process.env.REACT_APP_KAKAO_ADDRESS_URL);

  const handleComplete = (data) => {
    setExhibition((old) => {
      return {
        ...old,
        detailLocation: {
          zonecode: data.zonecode,
          address: data.address,
          addressEnglish: data.addressEnglish,
          addressType: data.addressType,
          buildingName: data.buildingName,
          buildingCode: data.buildingCode,
          roadAddress: data.roadAddress,
          roadAddressEnglish: data.roadAddressEnglish,
          autoJibunAddress: data.autoJibunAddress,
          autoJibunAddressEnglish: data.autoJibunAddressEnglish,
          roadname: data.roadname,
          roadnameCode: data.roadnameCode,
          roadnameEnglish: data.roadnameEnglish,
        },
      };
    });
  };

  const [createExhibition] = usePostExhibition();

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    createExhibition(exhibition);
  };

  return (
    <form onSubmit={submitHandler}>
      <Box>
        <h1>작성구역. 카카오 지도 api가지고 오기</h1>
        <button type="button" onClick={handleClick}>
          지도
        </button>
        <input
          value={exhibition.detailLocation.address}
          readOnly
          placeholder="주소"
        />
        <input
          value={exhibition.detailLocation.zonecode}
          readOnly
          placeholder="우편번호"
        />
        <input type="text" placeholder="상세주소" />
      </Box>
      <div>시작일</div>
      <input type="date" />
      <div>종료일</div>
      <input type="date" />
      <div>제목</div>
      <input type="text" placeholder="제목" />
      <div>썸네일이미지</div>
      <div>상세이미지.여러장</div>
      <div>상세내용</div>
      <input type="text" placeholder="상세내용" />
      <div>종류</div>
      <select></select>
      <div>전화번호</div>
      <input type="number" placeholder="전화번호" />
      <div>작가</div>
      <input type="text" placeholder="작가" />
      <div>전시회 카테고리</div>
      <select></select>

      <button>등록</button>
    </form>
  );
}

export default ExhibitionForm;

const Box = styled.div`
  background-color: #b3f1ae;
  margin: 50px;
  padding: 50px;
`;

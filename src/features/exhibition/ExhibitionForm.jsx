import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { usePostExhibition } from "../../hooks/exhibition/usetPostExhibition";
import { useDropzoneinput } from "../../hooks/artgram/useDropzoneinput";
import { MdOutlineFileDownload } from "react-icons/md";
import { useGetimgurl } from "../../hooks/artgram/useGetimgurl";
import { Flex } from "../../components/Flex";
import { useDropzoneinputEx } from "../../hooks/exhibition/useDropzoneEx";
import { useGetimgurlEx } from "../../hooks/exhibition/useGetimgurlEx";
import { useMakeUrl } from "../../hooks/exhibition/useMakeUrl";
import { v4 as uuidv4 } from "uuid";
//Todo넣어야 하는 데이터.
//* startDate: “2023-04-01”,
//* endDate: “2023-04-30”,
//* exhibitionTitle:”제목”,
//!postImage: 썸네일(포스터)URL
//!artImage: [ { order: “1”, imgUrl: 이미지URL, imgCaption: 이미지 내용 }, { order: “2”, imgUrl: 이미지URL, imgCaption: 이미지 내용 },]
//*exhibitionDesc:”상세내용”
//exhibitionCode: “ES000001(개인전)”
//*entranceFee: “2,000(가격)”
//*artWorkCnt:”29(작품수)”
//*agencyAndsponsor:”(스폰서)”
//*location: “장소”,
//!contact: “01000000000” 전화번호 형식인지 확인.
//!authors: [{ order: “1”, author: “김재란”},{ order: “2”, author: ”백승호”},]
//!exhibitionCategoty: [“WK0001”, “WK0002”(전시 카테고리 - 애니메이션)]

function ExhibitionForm() {
  const [authorName, setAuthorName] = useState("");
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
    authors: [],
    exhibitionCategoty: [],
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
  const authorid = useRef(0);
  //리액트 쿼리.
  const [createExhibition] = usePostExhibition();
  //카카오 주소 api
  const open = useDaumPostcodePopup(process.env.REACT_APP_KAKAO_ADDRESS_URL);
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  //제출하기
  const submitHandler = (event) => {
    event.preventDefault();
    // const newImageUrls = s3imgurlhandle();
    setExhibition((pre) => {
      return { ...pre, artImage: imgurls };
    });
    createExhibition(exhibition);
  };
  //헨들러
  const onchangeHandler = (event) => {
    const { value, name } = event.target;
    if (name === "author") {
      setAuthorName(value);
      const newarr = [...exhibition.authors];
      newarr.splice(authorid.current, 1, {
        order: authorid.current + 1,
        author: value,
      });
      setExhibition((old) => {
        return {
          ...old,
          authors: newarr,
        };
      });
    } else if (name === "exhibitionCategoty") {
      setExhibition((old) => {
        return {
          ...old,
          exhibitionCategoty: [...old.exhibitionCategoty, value],
        };
      });
    } else {
      setExhibition((old) => {
        return { ...old, [name]: value };
      });
    }
  };

  // Drag&Drop files state 관리 및 화면에 미리보기 제어
  const [files, setFiles, getRootProps, getInputProps] = useDropzoneinputEx();
  useEffect(() => {
    // 마운트 해제시, 데이터 url 취소
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  // Drag&Drop state(files)를 AWS S3에 업로드하여 url 받아내고, newImageUrls state에 입력하기
  // URL받아내기
  const [urls, setUrls, s3imgurlhandle] = useGetimgurlEx(files);
  const sourceUrl = "exhibition";
  //이미지 따로 받아오기.

  const [imgurls, imgurlhandle] = useMakeUrl(files);
  console.log("img배열객체", imgurls);
  useEffect(() => {
    imgurlhandle();
  }, [files]);
  console.log("전시회", exhibition);

  return (
    <Flex as="form" onSubmit={submitHandler} fd="column" gap="10">
      <DIV>
        <div>작가</div>
        <input
          type="text"
          placeholder="작가"
          onChange={onchangeHandler}
          value={authorName}
          name="author"
        />
      </DIV>
      {/* //?done */}
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

      <div>제목</div>
      <input
        onChange={onchangeHandler}
        value={exhibition.exhibitionTitle}
        name="exhibitionTitle"
        type="text"
        placeholder="제목"
      />
      <div>시작일</div>
      <input
        onChange={onchangeHandler}
        value={exhibition.startDate}
        name="startDate"
        type="date"
      />
      <div>종료일</div>
      <input
        onChange={onchangeHandler}
        value={exhibition.endDate}
        name="endDate"
        type="date"
      />
      <div>상세내용</div>
      <input
        onChange={onchangeHandler}
        value={exhibition.exhibitionDesc}
        name="exhibitionDesc"
        type="text"
        placeholder="상세내용"
      />
      <div>전화번호</div>
      <input
        onChange={onchangeHandler}
        value={exhibition.contact}
        name="contact"
        type="number"
        placeholder="전화번호"
      />
      <select name="exhibitionCode" onChange={onchangeHandler}>
        <option value="ES0001">개인전</option>
        <option value="ES0002">다인전</option>
      </select>

      {/* //?done */}
      {/* //TODO이미지 1장만받기. */}
      <DIV>
        <div>상세이미지</div>
        <Section {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <DragIcon>
            <MdOutlineFileDownload />
          </DragIcon>
        </Section>
      </DIV>
      {/* //TODO이미지 1장만받기. */}
      <div>상세이미지.여러장</div>
      <div>종류</div>
      <select name="exhibitionCategoty" onChange={onchangeHandler}>
        <option value="WK0001">애니메이션</option>
        <option value="WK0002">수채화</option>
      </select>
      <div>전시회 카테고리</div>
      <button>등록</button>
    </Flex>
  );
}

export default ExhibitionForm;

const Box = styled.div`
  background-color: #b3f1ae;
  padding: 50px;
`;
const Section = styled.section`
  width: 100%;
  min-height: 110px;
  border: 2px dotted gray;
  border-radius: 8px;
  padding: 18px;
  text-align: center;
`;

const DragIcon = styled.div`
  width: 100px;
  height: 40px;
  margin: 0 auto;
  font-size: 3rem;
`;

const DIV = styled.div`
  background-color: #475dc2;
  text-align: center;
`;
const DIV2 = styled.div`
  background-color: #e1e78e;
  text-align: center;
`;

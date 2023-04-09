import { useDaumPostcodePopup } from "react-daum-postcode";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import { usePostExhibition } from "../../hooks/exhibition/usetPostExhibition";
import { useDropzoneinput } from "../../hooks/artgram/useDropzoneinput";
import { MdOutlineFileDownload } from "react-icons/md";
import { useGetimgurl } from "../../hooks/artgram/useGetimgurl";
import { Flex } from "../../components/Flex";
import {
  useDropzoneinputEx,
  useDropzoneinputPostEx,
} from "../../hooks/exhibition/useDropzoneEx";
import { useGetimgurlEx } from "../../hooks/exhibition/useGetimgurlEx";
import { useMakeUrl, useThumbnailUrl } from "../../hooks/exhibition/useMakeUrl";
import { v4 as uuidv4 } from "uuid";

function ExhibitionForm() {
  const [authorName, setAuthorName] = useState("");
  //유저 순서.
  const authorid = useRef(0);
  //보내야 하는값
  const [exhibition, setExhibition] = useState({
    startDate: "",
    endDate: "",
    exhibitionTitle: "",
    postImage: "",
    artImage: [],
    exhibitionDesc: "",
    exhibitionCode: "",
    entranceFee: 0,
    artWorkCnt: "",
    agencyAndsponsor: "",
    location: "",
    contact: "",
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
  //카카오 주소 api
  const open = useDaumPostcodePopup(process.env.REACT_APP_KAKAO_ADDRESS_URL);
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
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
  //리액트 쿼리.
  const [createExhibition] = usePostExhibition();
  //제출하기
  const submitHandler = (event) => {
    event.preventDefault();
    // const newImageUrls = s3imgurlhandle();
    setExhibition((pre) => {
      return { ...pre, artImage: imgurls, postImage: imgurlsPOST };
    });
    // createExhibition(exhibition);
  };
  //헨들러
  const onchangeHandler = (event) => {
    const { value, name } = event.target;
    //작가
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
    }
    //카테고리
    else if (name === "exhibitionCategoty") {
      setExhibition((old) => {
        return {
          ...old,
          exhibitionCategoty: [...old.exhibitionCategoty, value],
        };
      });
    }
    //입장료
    else if (name === "entranceFee") {
      setExhibition((old) => {
        const removedCommaValue = Number(value.replaceAll(",", ""));
        return {
          ...old,
          entranceFee: removedCommaValue.toLocaleString(),
        };
      });
    }
    //기본
    else {
      setExhibition((old) => {
        return { ...old, [name]: value };
      });
    }
  };

  // Drag&Drop files state 관리 및 화면에 미리보기,url생성기 상세이미지용
  const [files, setFiles, getRootProps, getInputProps] = useDropzoneinputEx();
  useEffect(() => {
    // 마운트 해제시, 데이터 url 취소
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  // Drag&Drop state(files)를 AWS S3에 업로드하여 url 받아내고, newImageUrls state에 입력하기
  // URL받아내기
  const [urls, setUrls, s3imgurlhandle] = useGetimgurlEx(files);
  const sourceUrl = "exhibition";
  const [imgurls, imgurlhandle] = useMakeUrl(files);
  useEffect(() => {
    imgurlhandle();
  }, [files]);
  //섬네일용이미지 url 값 생성기.
  const [postfiles, setPostFiles, getRootPropsPOST, getInputPropsPOST] =
    useDropzoneinputPostEx();
  const [imgurlsPOST, imgurlhandlePOST] = useThumbnailUrl(postfiles);
  useEffect(() => {
    imgurlhandlePOST();
  }, [postfiles]);
  console.log("postfiles섬네일", postfiles);
  console.log("전시회", exhibition);
  return (
    <Flex as="form" onSubmit={submitHandler} fd="column" gap="10">
      <Box>
        <h1>작성구역. 카카오 지도 api가지고 오기</h1>
        <button type="button" onClick={handleClick}>
          주소 검색
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
        <input
          type="text"
          onChange={onchangeHandler}
          value={exhibition.location}
          name="location"
          placeholder="상세주소"
        />
      </Box>
      <DIV2>
        <div>섬네일이미지</div>
        <Section {...getRootPropsPOST({ className: "dropzone" })}>
          <input {...getInputPropsPOST()} />
          <DragIcon>
            <MdOutlineFileDownload />
          </DragIcon>
        </Section>
        <ThumbsContainer>
          {postfiles &&
            postfiles.map((file) => (
              <Thumb key={file.name}>
                <ThumbInner>
                  <Thumbimg
                    src={file.preview}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                </ThumbInner>
              </Thumb>
            ))}
        </ThumbsContainer>
      </DIV2>
      <DIV2>
        <div>상세이미지</div>
        <Section {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <DragIcon>
            <MdOutlineFileDownload />
          </DragIcon>
        </Section>
        <ThumbsContainer>
          {files &&
            files.map((file) => (
              <Thumb key={file.name}>
                <ThumbInner>
                  <Thumbimg
                    src={file.preview}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                  />
                </ThumbInner>
              </Thumb>
            ))}
        </ThumbsContainer>
      </DIV2>
      <DIV>
        <div>제목</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.exhibitionTitle}
          name="exhibitionTitle"
          type="text"
          placeholder="제목"
        />
      </DIV>
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
      <DIV>
        <div>스폰서</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.agencyAndsponsor}
          name="agencyAndsponsor"
          type="text"
          placeholder="후원"
        />
      </DIV>
      <DIV>
        <div>관람료</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.entranceFee}
          name="entranceFee"
          placeholder="관람료"
          maxLength={7}
        />
      </DIV>
      <DIV>
        <div>작품수</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.artWorkCnt}
          name="artWorkCnt"
          type="text"
          placeholder="작품수"
        />
      </DIV>
      <DIV>
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
      </DIV>
      <DIV>
        <div>상세내용</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.exhibitionDesc}
          name="exhibitionDesc"
          type="text"
          placeholder="상세내용"
        />
      </DIV>
      <DIV>
        <div>전화번호</div>
        <input
          onChange={onchangeHandler}
          value={exhibition.contact}
          name="contact"
          type="number"
          placeholder="전화번호"
        />
      </DIV>
      <DIV>
        <div>전시회 종류</div>
        <select name="exhibitionCode" onChange={onchangeHandler}>
          <option value="ES0001">개인전</option>
          <option value="ES0002">다인전</option>
        </select>
      </DIV>
      <DIV>
        <div>전시회 테마</div>
        <select name="exhibitionCategoty" onChange={onchangeHandler}>
          <option value="WK0001">애니메이션</option>
          <option value="WK0002">수채화</option>
        </select>
        <div>전시회 카테고리</div>
      </DIV>
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
  background-color: #7a7777;
  margin: 10px;
  text-align: center;
`;
const DIV2 = styled.div`
  background-color: #e1e78e;
  text-align: center;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 130px;
  height: 130px;
  padding: 4;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Thumbimg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
  gap: 13px;
`;

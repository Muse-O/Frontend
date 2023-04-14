import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { usePostExhibition } from "../../hooks/exhibition/usetPostExhibition";
import { MdOutlineFileDownload } from "react-icons/md";
import { Flex } from "../../components/Flex";
import {
  useGetPostimgurlEx,
  useGetimgurlEx,
} from "../../hooks/exhibition/useGetimgurlEx";
import {
  useDropzoneinputEx,
  useDropzoneinputPostEx,
} from "../../hooks/exhibition/useDropzoneEx";
import { useSetExhibition } from "../../hooks/exhibition/useSetExhibition";

function ExhibitionForm() {
  const [createExhibition] = usePostExhibition();
  const sourceUrl = "exhibition";
  const [
    exhibition,
    setExhibition,
    exhibitionKind,
    changeOnOff,
    authorid,
    authorName,
    setAuthorName,
    handleClick,
    onchangeHandler,
  ] = useSetExhibition();
  //dropzoneinput의 file 관리
  const [postfiles, setPostFiles, getRootPropsPOST, getInputPropsPOST] =
    useDropzoneinputPostEx();
  const [files, setFiles, getRootProps, getInputProps] = useDropzoneinputEx();
  //s3이미지 제출,url얻어오기
  const [s3imgurlhandle] = useGetimgurlEx(files);
  const [s3Postimgurlhandle] = useGetPostimgurlEx(postfiles);
  // 마운트 해제시, 데이터 url 취소
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      postfiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);
  //제출하기
  const submitHandler = (event) => {
    event.preventDefault();
    const urls = s3imgurlhandle(sourceUrl);
    const posturl = s3Postimgurlhandle(sourceUrl);
    createExhibition({
      ...exhibition,
      postImage: posturl,
      artImage: urls,
      exhibitionKind,
    });
  };
  console.log("이미지", files);
  const deletePostImg = (name, index) => {
    if (name === "postFile") {
      const currentFiles = [...postfiles];
      currentFiles.splice(index, 1);
      setPostFiles(currentFiles);
    }
    if (name === "files") {
      const currentFiles = [...files];
      currentFiles.splice(index, 1);
      setFiles(currentFiles);
    }
  };
  return (
    <Flex as="form" onSubmit={submitHandler} fd="row" gap="150">
      <PostWrap>
        <Post>
          <PageTitle>전시 등록</PageTitle>
          <SelectOnOff>
            <Offline type="button" name="EK0001" onClick={changeOnOff}>
              오프라인
            </Offline>
            <OnLine type="button" name="EK0002" onClick={changeOnOff}>
              온라인
            </OnLine>
          </SelectOnOff>
          {postfiles.length === 0 ? (
            <PostImgArea {...getRootPropsPOST({ className: "dropzone" })}>
              <DragIcon>
                <MdOutlineFileDownload />
              </DragIcon>
              <input {...getInputPropsPOST()} />
            </PostImgArea>
          ) : (
            postfiles.map((file, index) => (
              <div>
                <Postimg
                  key={file.name}
                  src={URL.createObjectURL(file)}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <button
                  type="button"
                  onClick={() => deletePostImg("postFile", index)}
                >
                  삭제
                </button>
              </div>
            ))
          )}
          <SubmitButton>전시등록하기</SubmitButton>
          <Caution>주의사항</Caution>
        </Post>
      </PostWrap>
      <ContentsWrap>
        <Box>
          <Explanation>전시제목</Explanation>
          <EXColum>
            <ExTitleKor>
              <span>한글</span>
              <TitleKor>
                <input
                  onChange={onchangeHandler}
                  value={exhibition.exhibitionTitle}
                  name="exhibitionTitle"
                  type="text"
                  placeholder="제목"
                />
              </TitleKor>
            </ExTitleKor>
            <ExTitleKor>
              <span>한글</span>
              <TitleKor>제목</TitleKor>
            </ExTitleKor>
          </EXColum>
        </Box>
        <Box>
          <Explanation>전시 설명</Explanation>
          <ExDesc>
            <input
              onChange={onchangeHandler}
              value={exhibition.exhibitionDesc}
              name="exhibitionDesc"
              type="text"
              placeholder="상세내용"
            />
          </ExDesc>
        </Box>
        {exhibitionKind === "EK0002" && (
          <Box>
            <Explanation>전시 링크</Explanation>
            <input
              onChange={onchangeHandler}
              value={exhibition.exhibitionOnlineLink}
              name="exhibitionOnlineLink"
              type="text"
              placeholder="링크"
            />
          </Box>
        )}
        <Box>
          <Explanation>전시 기간</Explanation>
          <Flex fd="colum">
            <div style={{ color: "red" }}>시작일</div>
            <input
              onChange={onchangeHandler}
              value={exhibition.startDate}
              name="startDate"
              type="date"
            />
            <div style={{ color: "red" }}>종료일</div>
            <input
              onChange={onchangeHandler}
              value={exhibition.endDate}
              name="endDate"
              type="date"
            />
          </Flex>
        </Box>
        <Box>
          <Explanation>전시 위치</Explanation>
          <p style={{ color: "red" }}>작성구역. 카카오 지도 api가지고 오기</p>
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
        <Box>
          <Explanation>입장료</Explanation>
          <input
            onChange={onchangeHandler}
            value={exhibition.entranceFee}
            name="entranceFee"
            maxLength={7}
          />
        </Box>
        <Box>
          <Explanation>전시종류</Explanation>
          <select name="exhibitionCode" onChange={onchangeHandler}>
            <option>선택해 주세요</option>
            <option value="ES0001">개인전</option>
            <option value="ES0002">다인전</option>
          </select>
        </Box>
        <Box>
          <Explanation>전회 테마</Explanation>
          <select name="exhibitionCategoty" onChange={onchangeHandler}>
            <option>선택해 주세요</option>
            <option value="WK0001">애니메이션</option>
            <option value="WK0002">수채화</option>
          </select>
        </Box>
        <Box>
          <Explanation>작가</Explanation>
          <input
            type="text"
            placeholder="작가"
            onChange={onchangeHandler}
            value={authorName}
            name="author"
          />
        </Box>
        <Box>
          <Explanation>작품수</Explanation>
          <input
            onChange={onchangeHandler}
            value={exhibition.artWorkCnt}
            name="artWorkCnt"
            type="text"
            placeholder="작품수"
          />
        </Box>
        <Box>
          <Explanation>운영시간</Explanation>
        </Box>
        <Box>
          <Explanation>연락처</Explanation>
          <input
            onChange={onchangeHandler}
            value={exhibition.contact}
            name="contact"
            type="number"
            placeholder="전화번호"
          />
        </Box>
        <Box>
          <Explanation>주최/후원</Explanation>
          <input
            onChange={onchangeHandler}
            value={exhibition.agencyAndSponsor}
            name="agencyAndSponsor"
            type="text"
            placeholder="후원"
          />
        </Box>
        <Box>
          <Explanation>작품사진</Explanation>
          <EXColum>
            <Section {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <DragIcon>
                <MdOutlineFileDownload />
              </DragIcon>
            </Section>
            <ThumbsContainer>
              {files?.map((file, index) => (
                <div>
                  <Thumb key={file.name}>
                    <ThumbInner>
                      <Thumbimg
                        src={URL.createObjectURL(file)}
                        onLoad={() => {
                          URL.revokeObjectURL(file.preview);
                        }}
                      />
                    </ThumbInner>
                  </Thumb>
                  <button
                    type="button"
                    onClick={() => deletePostImg("files", index)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </ThumbsContainer>
          </EXColum>
        </Box>
      </ContentsWrap>
    </Flex>
  );
}

export default ExhibitionForm;

const ComentBox = styled.div`
  display: flex;
`;
const Post = styled.div`
  position: fixed;
`;
const ExDesc = styled.div`
  background-color: #7d7dfd;
  width: 493px;
  height: 254px;
`;
const Explanation = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  width: 150px;
`;
const TitleKor = styled.div`
  margin-left: 18px;
  width: 452px;
  background-color: greenyellow;
  height: 100%;
`;
const ExTitleKor = styled.div`
  display: flex;
  height: 41px;
  width: 452px;
  align-items: center;
  background-color: aliceblue;
`;
const EXColum = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
`;
const ContentsWrap = styled.div`
  margin-top: 172px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const Caution = styled.div`
  width: 364px;
  height: 100px;
  background-color: #d9d9d9;
  margin-top: 20px;
`;
const SubmitButton = styled.button`
  background-color: #d9d9d9;
  width: 364px;
  height: 40px;
  border-radius: 50px;
  margin-top: 15px;
`;
const PostImgArea = styled.div`
  display: flex;
  background-color: #d9d9d9;
  border: 2px dotted gray;
  border-radius: 8px;
  height: 520px;
  width: 364px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  /* flex: 1; */
`;
const OnLine = styled.button`
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  :hover {
    background-color: #fff0f0;
  }
`;
const Offline = styled.button`
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  margin-right: 60px;
  :hover {
    background-color: #fff0f0;
  }
`;
const PageTitle = styled.h1`
  margin-top: 40px;
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 57px;
`;

const PostWrap = styled.div`
  position: relative;
  /* background-color: #b9f7b9; */
  flex-direction: column;
  display: flex;
  flex: 1;
  max-width: 515px;
  max-height: 1080px;
  margin-left: 75px;
`;

const SelectOnOff = styled.div`
  margin-top: 30px;
`;

//--

// const Box = styled.div`
//   background-color: #b3f1ae;
//   padding: 50px;
// `;
const Section = styled.section`
  width: 500px;
  min-height: 110px;
  border: 2px dotted gray;
  border-radius: 8px;
  padding: 18px;
  text-align: center;
`;

const DragIcon = styled.div`
  background-color: aliceblue;
  /* width: 100px;
  height: 40px; */
  font-size: 3rem;
  padding: 0 auto;
`;

// const DIV = styled.div`
//   background-color: #7a7777;
//   margin: 10px;
//   text-align: center;
// `;
// const DIV2 = styled.div`
//   background-color: #e1e78e;
//   text-align: center;
// `;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  gap: 8px;
  width: 130px;
  height: 130px;
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
const Postimg = styled.img`
  display: block;
  border-radius: 8px;
  width: 365px;
  max-height: 520px;
  margin-top: 40px;
`;

const ThumbsContainer = styled.aside`
  width: 500px;
  display: flex;
  margin-top: 16;
  gap: 13px;
  overflow-x: scroll;
`;

{
  /* <DIV>
<div style={{ color: "red" }}>온라인 오프라인?</div>
<select name="exhibitionKind" onChange={onchangeHandler}>
  <option>선택해 주세요</option>
  <option value="EK0001 ">오프라인</option>
  <option value="EK0002 ">온라인</option>
</select>
</DIV>
{exhibition.exhibitionKind === "EK0002 " && (
<DIV>
  <div style={{ color: "red" }}>링크</div>
  <input
    onChange={onchangeHandler}
    value={exhibition.exhibitionOnlineLink}
    name="exhibitionOnlineLink"
    type="text"
    placeholder="링크"
  />
</DIV>
)}
<Box>
<p style={{ color: "red" }}>작성구역. 카카오 지도 api가지고 오기</p>
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
  {files?.map((file) => (
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
<div style={{ color: "red" }}>제목</div>
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
  value={exhibition.agencyAndSponsor}
  name="agencyAndSponsor"
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
<div style={{ color: "red" }}>시작일</div>
<input
  onChange={onchangeHandler}
  value={exhibition.startDate}
  name="startDate"
  type="date"
/>
<div style={{ color: "red" }}>종료일</div>
<input
  onChange={onchangeHandler}
  value={exhibition.endDate}
  name="endDate"
  type="date"
/>
</DIV>
<DIV>
<div style={{ color: "red" }}>상세내용</div>
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
<div style={{ color: "red" }}>전시회 종류</div>
<select name="exhibitionCode" onChange={onchangeHandler}>
  <option>선택해 주세요</option>
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
<button>등록</button> */
}

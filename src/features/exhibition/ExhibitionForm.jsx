import styled from "styled-components";
import React, { useEffect } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Flex } from "../../components/Flex";
import { useSetExhibition } from "../../hooks/exhibition/useSetExhibition";
import { useGetImgUrl } from "./CreateURL";
import { useDropzoneInput } from "../../hooks/exhibition/useDropZone";

function ExhibitionForm(props) {
  const info = props.Detaildata?.exhibitionInfo;
  const sourceUrl = "exhibition";
  const [
    postfiles,
    setPostFiles,
    getRootPropsPOST,
    getInputPropsPOST,
    deleteImgPOST,
  ] = useDropzoneInput(1);
  const [files, setFiles, getRootProps, getInputProps, deleteImg] =
    useDropzoneInput(10);
  const [s3ImgUrlHandle] = useGetImgUrl(sourceUrl);
  const [s3PostImgUrlHandle] = useGetImgUrl(sourceUrl, true);
  const [
    exhibition,
    exhibitionKind,
    changeOnOff,
    authorName,
    handleClick,
    onchangeHandler,
  ] = useSetExhibition(
    props.DetailLoading,
    props.DetailError,
    props.Detaildata,
    setFiles,
    setPostFiles
  );

  //제출버튼
  const submitHandler = (event) => {
    event.preventDefault();
    const urls = s3ImgUrlHandle(files);
    const posturl = s3PostImgUrlHandle(postfiles);
    props.createExhibition({
      ...exhibition,
      postImage: posturl,
      artImage: urls,
      exhibitionKind,
    });
  };
  //업데이트 버튼

  const hasFileProperty = (obj) => {
    return (
      obj instanceof File ||
      (typeof obj === "object" &&
        obj.hasOwnProperty("name") &&
        obj.hasOwnProperty("lastModified") &&
        obj.hasOwnProperty("size") &&
        obj.hasOwnProperty("type"))
    );
  };

  const submitUpdateHandler = (event) => {
    event.preventDefault();
    const posturl = hasFileProperty(postfiles)
      ? s3PostImgUrlHandle(postfiles)
      : info.postImage;

    const fileObjs = [];
    const otherObjs = [];
    files.forEach((obj) => {
      if (hasFileProperty(obj)) {
        fileObjs.push(obj);
      } else {
        otherObjs.push(obj);
      }
    });

    const currentobjs = otherObjs.map((file) => {
      return {
        order: file.order,
        imgUrl: file.preview,
        imgCaption: file.imgCaption,
      };
    });

    const urls = [...currentobjs, ...s3ImgUrlHandle(fileObjs)];

    props.updateExhibition({
      ...exhibition,
      postImage: posturl,
      artImage: urls,
      exhibitionKind,
    });
  };

  const checkFile = () => {
    // console.log(info.postImage);
    // console.log(info.ExhibitionImgs);
    console.log("파일들", files);
    console.log("정보", info);
  };
  return (
    <Flex
      as={"form"}
      onSubmit={props.Detaildata ? submitUpdateHandler : submitHandler}
      fd="row"
      gap="150"
    >
      <PostWrap>
        <Post>
          <PageTitle>전시 등록</PageTitle>
          <button type="button" onClick={checkFile}>
            {" "}
            확인
          </button>
          <SelectOnOff>
            <Offline
              type="button"
              name="EK0001"
              onClick={changeOnOff}
              exhibitionKind={exhibitionKind}
            >
              오프라인
            </Offline>
            <OnLine
              type="button"
              name="EK0002"
              onClick={changeOnOff}
              exhibitionKind={exhibitionKind}
            >
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
                <Postimg key={file.name} src={file.preview} />
                <button type="button" onClick={() => deleteImgPOST(index)}>
                  삭제
                </button>
              </div>
            ))
          )}
          {props.Detaildata ? (
            <UpDateButtons>
              <SubmitButton type={"submit"}>전시수정하기</SubmitButton>
              <SubmitButton type={"button"} onClick={props.deleteHandler}>
                전시삭제하기
              </SubmitButton>
            </UpDateButtons>
          ) : (
            <SubmitButton type={"submit"}>전시등록하기</SubmitButton>
          )}
          <Caution>주의사항</Caution>
        </Post>
      </PostWrap>
      <ContentsWrap>
        <Box>
          <Explanation>전시제목</Explanation>
          <EXColum>
            <ExTitleKor>
              <TitleP>한글</TitleP>
              <TitleInput
                onChange={onchangeHandler}
                value={exhibition.exhibitionTitle}
                name="exhibitionTitle"
                type="text"
                placeholder="제목"
              />
            </ExTitleKor>
            <ExTitleKor>
              <TitleP>영문</TitleP>
              <TitleInput
                onChange={onchangeHandler}
                value={exhibition.exhibitionEngTitle}
                name="exhibitionEngTitle"
                type="text"
                placeholder="Title"
              />
            </ExTitleKor>
          </EXColum>
        </Box>
        <Box>
          <Explanation>전시 설명</Explanation>
          <ExDesc>
            <Textarea
              width={"473px"}
              height={"260px"}
              onChange={onchangeHandler}
              value={exhibition.exhibitionDesc}
              name="exhibitionDesc"
              type="text"
              placeholder="상세내용"
            />
          </ExDesc>
        </Box>
        <Box>
          <Explanation>전시 링크</Explanation>
          <TitleInput
            onChange={onchangeHandler}
            value={exhibition.exhibitionLink}
            name="exhibitionLink"
            type="text"
            placeholder="링크"
          />
        </Box>
        <Box>
          <Explanation>전시 기간</Explanation>
          <TitleInput
            onChange={onchangeHandler}
            value={exhibition.startDate}
            name="startDate"
            type="date"
          />
          <Separator>-</Separator>
          <TitleInput
            onChange={onchangeHandler}
            value={exhibition.endDate}
            name="endDate"
            type="date"
          />
        </Box>
        {exhibitionKind === "EK0001" && (
          <>
            <Box>
              <Explanation>전시 위치</Explanation>
              <Location>
                <LocationBox>
                  <TitleInput
                    bg={"#DDDDDD"}
                    value={exhibition.detailLocation.address}
                    readOnly
                    placeholder="주소"
                  />
                  <TitleInput
                    bg={"#DDDDDD"}
                    value={exhibition.detailLocation.zonecode}
                    readOnly
                    placeholder="우편번호"
                  />
                  <ButtonsAddress type="button" onClick={handleClick}>
                    주소 검색
                  </ButtonsAddress>
                </LocationBox>
                <TitleInput
                  type="text"
                  onChange={onchangeHandler}
                  value={exhibition.location}
                  name="location"
                  placeholder="상세주소"
                />
              </Location>
            </Box>
            <Box>
              <Explanation>운영시간</Explanation>
              <Location>
                <LocationBox>
                  <TitleInput
                    type="time"
                    name="openTime"
                    value={exhibition.openTime}
                    onChange={onchangeHandler}
                  />
                  <Separator>-</Separator>
                  <TitleInput
                    type="time"
                    name="closeTime"
                    value={exhibition.closeTime}
                    onChange={onchangeHandler}
                  />
                </LocationBox>
                <ExDesc>
                  <Textarea
                    // onChange={onchangeHandler}
                    // value={exhibition.exhibitionDesc}
                    width={"473px"}
                    height={"91px"}
                    name=""
                    type="text"
                    placeholder="설명"
                  />
                </ExDesc>
              </Location>
            </Box>
            <Box>
              <Explanation>입장료</Explanation>
              <TitleInput
                onChange={onchangeHandler}
                value={exhibition.entranceFee}
                name="entranceFee"
                maxLength={7}
              />
            </Box>
          </>
        )}
        <Box>
          <Explanation>전시 주최</Explanation>
          <select
            name="exhibitionHost"
            onChange={onchangeHandler}
            value={exhibition.exhibitionHost}
          >
            <option>선택해 주세요</option>
            <option value="EH0001">개인/팀</option>
            <option value="EH0002">기업</option>
            <option value="EH0003">기관</option>
          </select>
        </Box>
        <Box>
          <Explanation value={exhibition.exhibitionCategoty[0]}>
            전시회 분류
          </Explanation>
          <select name="exhibitionCategoty" onChange={onchangeHandler}>
            <option>선택해 주세요</option>
            <option value="WK0001">애니메이션</option>
            <option value="WK0002">수채화</option>
            <option value="WK0003">이게뭐지?</option>
          </select>
        </Box>
        <Box>
          <Explanation>작가</Explanation>
          <TitleInput
            type="text"
            placeholder="작가"
            onChange={onchangeHandler}
            value={authorName}
            name="author"
          />
        </Box>
        <Box>
          <Explanation>작품수</Explanation>
          <TitleInput
            onChange={onchangeHandler}
            value={exhibition.artWorkCnt}
            name="artWorkCnt"
            type="text"
            placeholder="작품수"
          />
        </Box>
        <Box>
          <Explanation>연락처</Explanation>
          <TitleInput
            onChange={onchangeHandler}
            value={exhibition.contact}
            name="contact"
            placeholder="전화번호"
            maxLength={"13"}
          />
        </Box>
        <Box>
          <Explanation>후원</Explanation>
          <TitleInput
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
              <TitleInput {...getInputProps()} />
              <DragIcon>
                <MdOutlineFileDownload />
              </DragIcon>
            </Section>
            <ThumbsContainer>
              {files?.map((file, index) => (
                <div>
                  <Thumb key={file.name}>
                    <ThumbInner>
                      <Thumbimg src={file.preview} />
                    </ThumbInner>
                  </Thumb>
                  <button type="button" onClick={() => deleteImg(index)}>
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
const UpDateButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ButtonsAddress = styled.button`
  border: 1px solid #3c3c3c;
  border-radius: 8px;
  background: #ffffff;
  width: 80px;
  :hover {
    background-color: #838383;
  }
`;
const TitleP = styled.p`
  flex: 1;
  max-width: 32px;
`;
const LocationBox = styled.div`
  display: flex;
  gap: 5px;
`;
const Location = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: auto;
`;
const Separator = styled.span`
  margin: 0 8px;
  font-size: 35px;
`;

const Textarea = styled.textarea`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  resize: none;
  overflow-y: auto;
  border-radius: 8px;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 8px;
    background-color: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
`;
const ComentBox = styled.div`
  display: flex;
`;
const Post = styled.div`
  position: fixed;
`;
const ExDesc = styled.div`
  width: 493px;
  height: auto;
`;
const Explanation = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  width: 150px;
`;
const TitleInput = styled.input`
  background-color: ${({ bg }) => bg};
  border: 1px solid black;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  width: 100%;
  height: 41px;
  flex: 1;
`;
const TitleKor = styled.div`
  margin-left: 18px;
  width: 452px;
  height: 100%;
  flex: 1;
`;
const ExTitleKor = styled.div`
  display: flex;
  height: 41px;
  width: 452px;
  align-items: center;
`;
const EXColum = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  margin: 18px 0px;
`;
const ContentsWrap = styled.div`
  margin-top: 172px;
  display: flex;
  width: 622px;
  flex-direction: column;
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
  background-color: #ffffff;
  :hover {
    background-color: #fff0f0;
  }
  color: ${(props) => (props.exhibitionKind === "EK0002" ? "red" : "black")};
`;
const Offline = styled.button`
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 38px;
  margin-right: 60px;
  background-color: #ffffff;
  :hover {
    background-color: #fff0f0;
  }
  color: ${(props) => (props.exhibitionKind === "EK0001" ? "red" : "black")};
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
const ReviewWrap = styled.div`
  background-color: #e1e78e;
`;

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
  margin: 16px 0px 40px 0px;
  gap: 13px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤 바의 색상 */
    border-radius: 4px; /* 스크롤 바의 모서리 둥글기 */
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); /* 스크롤 바의 그림자 */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #244dde;
  }
`;

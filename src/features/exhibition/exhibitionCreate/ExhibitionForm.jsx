import styled from "styled-components";
import React from "react";
import { Flex } from "../../../components/Flex";
import { useSetExhibition } from "../../../hooks/exhibition/useSetExhibition";
import { useGetImgUrl } from "./CreateURL";
import { useDropzoneInput } from "../../../hooks/exhibition/useDropZone";
import { PostEX } from "./PostEX";
import { UpdateEX } from "./UpdateEX";
import plus_white from "../../../assets/imgs/common/plus_white.png";
import SelectEX from "./SelectEX";
import CalendarEX from "./CalendarEX";

function ExhibitionForm({
  createExhibition,
  Detaildata,
  DetailLoading,
  updateExhibition,
  deleteHandler,
}) {
  const sourceUrl = "exhibition";
  //썸네일용 dorpzone
  const [
    postfiles,
    setPostFiles,
    getRootPropsPOST,
    getInputPropsPOST,
    deleteImgPOST,
  ] = useDropzoneInput(1);
  //상세설명용 dorpzone
  const [files, setFiles, getRootProps, getInputProps, deleteImg] =
    useDropzoneInput(10);
  //이미지 URL 생성기 + 이미지 파일 업로드 함수
  const [s3ImgUrlHandle] = useGetImgUrl(sourceUrl);
  const [s3PostImgUrlHandle] = useGetImgUrl(sourceUrl, true);
  //업로드 정보, ONLINE,OFF라인 변경버튼,카카오 주소 버튼, 데이터 onChange 함수
  //detaildata 가 있으면 수정페이지 접속시 데이터 적용
  const [
    exhibition,
    exhibitionKind,
    changeOnOff,
    authorName,
    handleClick,
    onchangeHandler,
  ] = useSetExhibition(DetailLoading, Detaildata, setFiles, setPostFiles);
  //post
  const PostEXHandler = PostEX(
    s3ImgUrlHandle,
    s3PostImgUrlHandle,
    files,
    postfiles,
    exhibition,
    exhibitionKind,
    createExhibition
  );
  //update
  const UpdateEXHandler = UpdateEX(
    s3ImgUrlHandle,
    s3PostImgUrlHandle,
    files,
    postfiles,
    exhibition,
    exhibitionKind,
    Detaildata,
    updateExhibition
  );

  return (
    <>
      {DetailLoading ? (
        <div>로딩중</div>
      ) : (
        <Flex
          as={"form"}
          onSubmit={Detaildata ? UpdateEXHandler : PostEXHandler}
          fd="row"
          gap="150"
        >
          <PostWrap>
            <Post>
              <PageTitle>전시 등록</PageTitle>
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
                  <DragIcon src={plus_white} />
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
              {Detaildata ? (
                <UpDateButtons>
                  <SubmitButton type={"submit"}>전시수정하기</SubmitButton>
                  <SubmitButton type={"button"} onClick={deleteHandler}>
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
              <DetailExplanation>
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
                    <TitleP>Eng</TitleP>
                    <TitleInput
                      onChange={onchangeHandler}
                      value={exhibition.exhibitionEngTitle}
                      name="exhibitionEngTitle"
                      type="text"
                      placeholder="Title"
                    />
                  </ExTitleKor>
                </EXColum>
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>전시 설명</Explanation>
              <DetailExplanation>
                <Textarea
                  width={"100%"}
                  height={"260px"}
                  onChange={onchangeHandler}
                  value={exhibition.exhibitionDesc}
                  name="exhibitionDesc"
                  type="text"
                  placeholder="상세내용"
                />
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>전시 링크</Explanation>
              <DetailExplanation>
                <TitleInput
                  onChange={onchangeHandler}
                  value={exhibition.exhibitionLink}
                  name="exhibitionLink"
                  type="text"
                  placeholder="링크"
                />
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>전시 기간</Explanation>
              <DetailExplanation>
                <CalendarEX>openDay</CalendarEX>
                <CalendarEX>closeDay</CalendarEX>
              </DetailExplanation>
            </Box>
            {exhibitionKind === "EK0001" && (
              <>
                <Box>
                  <Explanation>전시 위치</Explanation>
                  <DetailExplanation>
                    <EXColum>
                      <LocationBox>
                        <TitleInput
                          bg={"#EEEEEE"}
                          value={exhibition.detailLocation.address}
                          readOnly
                          placeholder="주소"
                        />
                        <TitleInput
                          bg={"#EEEEEE"}
                          value={exhibition.detailLocation.zonecode}
                          readOnly
                          placeholder="우편번호"
                          width={"160px"}
                        />
                        <ButtonsAddress type="button" onClick={handleClick}>
                          주소 찾기
                        </ButtonsAddress>
                      </LocationBox>
                      <TitleInput
                        type="text"
                        onChange={onchangeHandler}
                        value={exhibition.location}
                        name="location"
                        placeholder="상세주소"
                      />
                    </EXColum>
                  </DetailExplanation>
                  <WriteRule>
                    <span>
                      작성 시 건물 명 명시부탁드립니다. &nbsp; ex) OO갤러리
                    </span>
                  </WriteRule>
                </Box>
                <Box>
                  <Explanation>운영시간</Explanation>
                  <DetailExplanation>
                    <EXColum>
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
                          onChange={onchangeHandler}
                          value={exhibition.significant}
                          width={"100%"}
                          height={"91px"}
                          name=""
                          type="text"
                          placeholder="설명"
                        />
                      </ExDesc>
                    </EXColum>
                  </DetailExplanation>
                  <WriteRule>
                    <span>
                      ※ 마감시간이나 휴관일 등 기타 운영과 관련된 사항
                      작성해주세요!
                    </span>
                  </WriteRule>
                </Box>
                <Box>
                  <Explanation>입장료</Explanation>
                  <DetailExplanation>
                    <TitleInput
                      onChange={onchangeHandler}
                      value={exhibition.entranceFee}
                      name="entranceFee"
                      maxLength={7}
                    />
                  </DetailExplanation>
                </Box>
              </>
            )}
            <Box>
              <Explanation>전시 주최</Explanation>
              <DetailExplanation>
                <SelectEX
                  EXvalue={exhibition.exhibitionHost}
                  onChange={onchangeHandler}
                  EXname={"exhibitionHost"}
                  options={[
                    { EH0001: "개인/팀" },
                    { EH0002: "기업" },
                    { EH0003: "기관" },
                  ]}
                />
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>전시회 분류</Explanation>
              <DetailExplanation>
                <SelectEX
                  EXvalue={exhibition.exhibitionCategoty}
                  onChange={onchangeHandler}
                  EXname={"exhibitionCategoty"}
                  options={[
                    { WK0001: "애니메이션" },
                    { WK0002: "수채화" },
                    { WK0003: "추가1" },
                    { WK0004: "추가2" },
                    { WK0005: "추가3" },
                    { WK0006: "추가4" },
                    { WK0007: "추가5" },
                  ]}
                />
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>작가</Explanation>
              <DetailExplanation>
                <TitleInput
                  type="text"
                  placeholder="작가"
                  onChange={onchangeHandler}
                  value={authorName}
                  name="author"
                />
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>작품수</Explanation>
              <DetailExplanation>
                <TitleInput
                  onChange={onchangeHandler}
                  value={exhibition.artWorkCnt}
                  name="artWorkCnt"
                  type="text"
                  placeholder="작품수"
                  width={"200px"}
                />
                <Count>정</Count>
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>연락처</Explanation>
              <DetailExplanation>
                <TitleInput
                  onChange={onchangeHandler}
                  value={exhibition.contact}
                  name="contact"
                  placeholder="전화번호"
                  maxLength={"13"}
                />
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>후원</Explanation>
              <DetailExplanation>
                <TitleInput
                  onChange={onchangeHandler}
                  value={exhibition.agencyAndSponsor}
                  name="agencyAndSponsor"
                  type="text"
                  placeholder="후원"
                />
              </DetailExplanation>
            </Box>
            <Box>
              <Explanation>작품사진</Explanation>
              <DetailExplanation>
                <Flex fd={"column"}>
                  <Section {...getRootProps({ className: "dropzone" })}>
                    <TitleInput {...getInputProps()} />
                    <SectionSpan>
                      파일을 끌어와 첨부하거나 클릭해주세요
                    </SectionSpan>
                  </Section>
                  {files.length === 0 ? (
                    <ThumbsContainer
                      {...getRootProps({ className: "dropzone" })}
                    >
                      <TitleInput {...getInputProps()} />
                    </ThumbsContainer>
                  ) : (
                    <ThumbsContainer>
                      <TumbsWrap>
                        {files?.map((file, index) => (
                          <div>
                            <Thumb key={file.name}>
                              <ThumbInner>
                                <Thumbimg src={file.preview} />
                              </ThumbInner>
                            </Thumb>
                            <button
                              type="button"
                              onClick={() => deleteImg(index)}
                            >
                              삭제
                            </button>
                          </div>
                        ))}
                      </TumbsWrap>
                    </ThumbsContainer>
                  )}
                </Flex>
              </DetailExplanation>
            </Box>
          </ContentsWrap>
        </Flex>
      )}
    </>
  );
}

export default ExhibitionForm;
const SectionSpan = styled.span`
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  user-select: none;
`;
const Count = styled.span`
  margin-left: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
`;
const DetailExplanation = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  flex: 1;
  max-width: 495px;
`;
const UpDateButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ButtonsAddress = styled.button`
  border: 1px solid #3c3c3c;
  border-radius: 8px;
  background: #ffffff;

  :hover {
    background-color: #eeeeee;
  }
`;
const TitleP = styled.p`
  flex: 1;
  max-width: 32px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 25px;
`;
const LocationBox = styled.div`
  display: flex;
  gap: 5px;
`;

const Separator = styled.span`
  margin: 0 8px;
  font-size: 35px;
`;

const Textarea = styled.textarea`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-sizing: border-box;
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
  flex: 1;
  max-width: 130px;
  padding-top: 8px;
`;
const TitleInput = styled.input`
  background-color: ${({ bg }) => bg};
  max-width: ${({ width }) => width || "100%"};
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 15px;
  font-size: 16px;
  height: 41px;
  flex: 1;
`;

const ExTitleKor = styled.div`
  display: flex;
  height: 41px;
  width: 100%;
  align-items: center;
`;
const EXColum = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  margin: 18px 0px;
`;
const ContentsWrap = styled.div`
  margin-top: 172px;
  display: flex;
  width: 820px;
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
  height: 520px;
  width: 364px;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 110px;
  background: #3c3c3c;
  border-radius: 10px 10px 0px 0px;
`;

const DragIcon = styled.img`
  width: 3em;
  height: 3em;
`;

const Postimg = styled.img`
  display: block;
  width: 365px;
  max-height: 520px;
  margin-top: 40px;
`;

const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  gap: 8px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const WriteRule = styled.div`
  display: flex;
  flex: 1;
  max-width: 190px;
  margin-left: 12px;
  & > span {
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: #5a5a5a;
  }
`;

const Thumbimg = styled.img`
  display: block;
  max-width: auto;
  max-height: 150px;
`;

const ThumbsContainer = styled.aside`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  min-height: 250px;
  gap: 13px;
  border-bottom: 1px dashed #242424;
  border-right: 1px dashed #242424;
  border-left: 1px dashed #242424;
  border-radius: 0 0 10px 10px;
  margin: 0px 0px 50px 0px;
`;
const TumbsWrap = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  min-height: 210px;
  margin: 0px 0px 50px 0px;
  padding: 16px;
  gap: 13px;
  overflow-x: scroll;
  margin: 10px;
  ::-webkit-scrollbar {
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #244dde;
  }
`;

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
import { EXFormBox } from "./EXFormBox";
import * as EXPost from "../css/exhibitionCreateCss/EXFormPostCss";
import * as EXContents from "../css/exhibitionCreateCss/EXFormContentsCss";

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
          <EXPost.PostWrap>
            <EXPost.Post>
              <EXPost.PageTitle>전시 등록</EXPost.PageTitle>
              <EXPost.SelectOnOff>
                <EXPost.Offline
                  type="button"
                  name="EK0001"
                  onClick={changeOnOff}
                  exhibitionKind={exhibitionKind}
                >
                  오프라인
                </EXPost.Offline>
                <EXPost.OnLine
                  type="button"
                  name="EK0002"
                  onClick={changeOnOff}
                  exhibitionKind={exhibitionKind}
                >
                  온라인
                </EXPost.OnLine>
              </EXPost.SelectOnOff>
              {postfiles.length === 0 ? (
                <EXPost.PostImgArea
                  {...getRootPropsPOST({ className: "dropzone" })}
                >
                  <EXPost.DragIcon src={plus_white} />
                  <input {...getInputPropsPOST()} />
                </EXPost.PostImgArea>
              ) : (
                postfiles.map((file, index) => (
                  <div>
                    <EXPost.Postimg key={file.name} src={file.preview} />
                    <button type="button" onClick={() => deleteImgPOST(index)}>
                      삭제
                    </button>
                  </div>
                ))
              )}
              {Detaildata ? (
                <EXPost.UpDateButtons>
                  <EXPost.SubmitButton type={"submit"}>
                    전시수정하기
                  </EXPost.SubmitButton>
                  <EXPost.SubmitButton type={"button"} onClick={deleteHandler}>
                    전시삭제하기
                  </EXPost.SubmitButton>
                </EXPost.UpDateButtons>
              ) : (
                <EXPost.SubmitButton type={"submit"}>
                  전시등록하기
                </EXPost.SubmitButton>
              )}
              <EXPost.Caution>주의사항</EXPost.Caution>
            </EXPost.Post>
          </EXPost.PostWrap>
          <EXContents.ContentsWrap>
            <EXFormBox Explan={"전시제목"}>
              <EXContents.EXColum>
                <EXContents.ExTitleKor>
                  <EXContents.TitleP>한글</EXContents.TitleP>
                  <EXContents.TitleInput
                    onChange={onchangeHandler}
                    value={exhibition.exhibitionTitle}
                    name="exhibitionTitle"
                    type="text"
                    placeholder="제목"
                  />
                </EXContents.ExTitleKor>
                <EXContents.ExTitleKor>
                  <EXContents.TitleP>Eng</EXContents.TitleP>
                  <EXContents.TitleInput
                    onChange={onchangeHandler}
                    value={exhibition.exhibitionEngTitle}
                    name="exhibitionEngTitle"
                    type="text"
                    placeholder="Title"
                  />
                </EXContents.ExTitleKor>
              </EXContents.EXColum>
            </EXFormBox>
            <EXFormBox Explan={"전시제목"}>
              <EXContents.Textarea
                width={"100%"}
                height={"260px"}
                onChange={onchangeHandler}
                value={exhibition.exhibitionDesc}
                name="exhibitionDesc"
                type="text"
                placeholder="상세내용"
              />
            </EXFormBox>
            <EXFormBox Explan={"전시 링크"}>
              <EXContents.TitleInput
                onChange={onchangeHandler}
                value={exhibition.exhibitionLink}
                name="exhibitionLink"
                type="text"
                placeholder="링크"
              />
            </EXFormBox>
            <EXFormBox Explan={"전시 기간"}>
              <CalendarEX>openDay</CalendarEX>
              <CalendarEX>closeDay</CalendarEX>
            </EXFormBox>
            {exhibitionKind === "EK0001" && (
              <>
                <EXFormBox
                  Explan={"전시 위치"}
                  WiteRule={
                    "작성 시 건물 명 명시부탁드립니다. &nbsp; ex) OO갤러리"
                  }
                >
                  <EXContents.EXColum>
                    <EXContents.LocationBox>
                      <EXContents.TitleInput
                        bg={"#EEEEEE"}
                        value={exhibition.detailLocation.address}
                        readOnly
                        placeholder="주소"
                      />
                      <EXContents.TitleInput
                        bg={"#EEEEEE"}
                        value={exhibition.detailLocation.zonecode}
                        readOnly
                        placeholder="우편번호"
                        width={"160px"}
                      />
                      <EXContents.ButtonsAddress
                        type="button"
                        onClick={handleClick}
                      >
                        주소 찾기
                      </EXContents.ButtonsAddress>
                    </EXContents.LocationBox>
                    <EXContents.TitleInput
                      type="text"
                      onChange={onchangeHandler}
                      value={exhibition.location}
                      name="location"
                      placeholder="상세주소"
                    />
                  </EXContents.EXColum>
                </EXFormBox>
                <EXFormBox
                  Explan={"운영시간"}
                  WiteRule={`※ 마감시간이나 휴관일 등 기타 운영과 관련된 사항
                      작성해주세요!`}
                >
                  <EXContents.EXColum>
                    <EXContents.LocationBox>
                      <EXContents.TitleInput
                        type="time"
                        name="openTime"
                        value={exhibition.openTime}
                        onChange={onchangeHandler}
                      />
                      <EXContents.Separator>-</EXContents.Separator>
                      <EXContents.TitleInput
                        type="time"
                        name="closeTime"
                        value={exhibition.closeTime}
                        onChange={onchangeHandler}
                      />
                    </EXContents.LocationBox>
                    <EXContents.ExDesc>
                      <EXContents.Textarea
                        onChange={onchangeHandler}
                        value={exhibition.significant}
                        width={"100%"}
                        height={"91px"}
                        name=""
                        type="text"
                        placeholder="설명"
                      />
                    </EXContents.ExDesc>
                  </EXContents.EXColum>
                </EXFormBox>
                <EXFormBox Explan={"입장료"}>
                  <EXContents.TitleInput
                    onChange={onchangeHandler}
                    value={exhibition.entranceFee}
                    name="entranceFee"
                    maxLength={7}
                  />
                </EXFormBox>
              </>
            )}
            <EXFormBox Explan={"전시 주최"}>
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
            </EXFormBox>
            <EXFormBox Explan={"전시회 분류"}>
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
            </EXFormBox>
            <EXFormBox Explan={"작가"}>
              <EXContents.TitleInput
                type="text"
                placeholder="작가"
                onChange={onchangeHandler}
                value={authorName}
                name="author"
              />
            </EXFormBox>
            <EXFormBox Explan={"작품수"}>
              <EXContents.TitleInput
                onChange={onchangeHandler}
                value={exhibition.artWorkCnt}
                name="artWorkCnt"
                type="text"
                placeholder="작품수"
                width={"200px"}
              />
              <EXContents.Count>정</EXContents.Count>
            </EXFormBox>
            <EXFormBox Explan={"연락처"}>
              <EXContents.TitleInput
                onChange={onchangeHandler}
                value={exhibition.contact}
                name="contact"
                placeholder="전화번호"
                maxLength={"13"}
              />
            </EXFormBox>
            <EXFormBox Explan={"후원"}>
              <EXContents.TitleInput
                onChange={onchangeHandler}
                value={exhibition.agencyAndSponsor}
                name="agencyAndSponsor"
                type="text"
                placeholder="후원"
              />
            </EXFormBox>
            <EXFormBox Explan={"작품사진"}>
              <Flex fd={"column"}>
                <EXContents.Section
                  {...getRootProps({ className: "dropzone" })}
                >
                  <EXContents.TitleInput {...getInputProps()} />
                  <EXContents.SectionSpan>
                    파일을 끌어와 첨부하거나 클릭해주세요
                  </EXContents.SectionSpan>
                </EXContents.Section>
                {files.length === 0 ? (
                  <EXContents.ThumbsContainer
                    {...getRootProps({ className: "dropzone" })}
                  >
                    <EXContents.TitleInput {...getInputProps()} />
                  </EXContents.ThumbsContainer>
                ) : (
                  <EXContents.ThumbsContainer>
                    <EXContents.TumbsWrap>
                      {files?.map((file, index) => (
                        <div>
                          <EXContents.Thumb key={file.name}>
                            <EXContents.ThumbInner>
                              <EXContents.Thumbimg src={file.preview} />
                            </EXContents.ThumbInner>
                          </EXContents.Thumb>
                          <button
                            type="button"
                            onClick={() => deleteImg(index)}
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </EXContents.TumbsWrap>
                  </EXContents.ThumbsContainer>
                )}
              </Flex>
            </EXFormBox>
          </EXContents.ContentsWrap>
        </Flex>
      )}
    </>
  );
}

export default ExhibitionForm;

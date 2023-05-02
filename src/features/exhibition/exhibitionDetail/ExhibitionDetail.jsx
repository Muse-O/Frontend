import React, { useRef } from "react";
import { useDetailGetExibition } from "../../../hooks/exhibition/useDetailGetExibition";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Flex } from "../../../components/Flex";
import ExhibitionReview from "./ExhibitionReview";
import ExhibitionReviewForm from "./ExhibitionReviewForm";
import { usetoken } from "../../../shared/cookies";
import { SubmitBtn } from "../../../components/Buttons";
import { useLikeExhibition } from "../../../hooks/exhibition/ExhibitionLikedScrap";
import NoneLiked from "../../../assets/imgs/common/heart_gray.png";
import Liked from "../../../assets/imgs/common/heart_full.png";
import NoneScrap from "../../../assets/imgs/common/bookmark_gray.png";
import Scrap from "../../../assets/imgs/common/bookmark_full.png";
import Review from "../../../assets/imgs/exhibition/sparkle_full_yellow.png";
function ExhibitionDetail() {
  const { id } = useParams();
  const navigator = useNavigate();
  const { decodetoken } = usetoken();
  const userEmail = decodetoken?.email;
  const reviewRef = useRef(null);
  const [data, isLoading, isError] = useDetailGetExibition(id);
  const info = data?.exhibitionInfo;
  const [LikeScrapExhibition] = useLikeExhibition(id);
  const likeScrapHandler = (LikeOrScrap) => {
    if (!decodetoken) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
    LikeScrapExhibition(LikeOrScrap);
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }
  return (
    <Flex>
      {info && (
        <>
          <BlackBg>
            <Date>
              <DateP>
                {info.startDate.slice(0, 10).replace(/-/g, ".")}-
                {info.endDate.slice(0, 10).replace(/-/g, ".")}
              </DateP>
              {/* //TODO 이부분 LIST컴포넌트랑 겹침 */}
              <EXstatusTitle>{info.exhibitionKindName}</EXstatusTitle>
              <EXstatusTitle status={"info"}>
                {info.exhibitionStatus === "전시 진행"
                  ? "Now On View"
                  : info.exhibitionStatus === "전시 예정"
                  ? "Coming Soon"
                  : info.exhibitionStatus === "전시 종료"
                  ? "Exhibition is over"
                  : ""}
              </EXstatusTitle>
            </Date>
            <Title>
              <TitleH1>{info.exhibitionTitle}</TitleH1>
            </Title>
            <SecondTitle>
              <SecondTitleH2>{info.exhibitionEngTitle}</SecondTitleH2>
            </SecondTitle>
          </BlackBg>
          <PostWrap>
            <Posts>
              <PostImg src={info.postImage} />
              <EXButtons>
                <ExBtn onClick={() => likeScrapHandler("like")}>
                  {info.liked === 0 ? (
                    <PostsBtnImg src={NoneLiked} />
                  ) : (
                    <PostsBtnImg src={Liked} />
                  )}
                  <Detailspan>좋아요</Detailspan>
                </ExBtn>
                <ExBtn
                  iscenter={true}
                  onClick={() => likeScrapHandler("scrap")}
                >
                  {info.scraped === 0 ? (
                    <PostsBtnImg src={NoneScrap} />
                  ) : (
                    <PostsBtnImg src={Scrap} />
                  )}
                  <Detailspan>스크랩</Detailspan>
                </ExBtn>
                <ExBtn>
                  <PostsBtnImg src={Review} />
                  <Detailspan>
                    평점{info.reviewStatus[0].reviewAvgRating.slice(0, 3)}
                  </Detailspan>
                </ExBtn>
              </EXButtons>
              <SubmitBtns>
                {info.userEmail === userEmail ? (
                  <SubmitBtn
                    onClick={() =>
                      navigator(`/exhibition/update/${info.exhibitionId}`)
                    }
                  >
                    수정하기
                  </SubmitBtn>
                ) : (
                  <SubmitBtn onClick={() => reviewRef.current.focus()}>
                    후기 작성
                  </SubmitBtn>
                )}
                <SubmitBtn onClick={() => navigator(`/exhibition`)}>
                  목록으로
                </SubmitBtn>
              </SubmitBtns>
            </Posts>
          </PostWrap>
          <ContentWrap>
            <Contents>
              <ExhibitionDescBOX>{info.exhibitionDesc}</ExhibitionDescBOX>
              <ExhibitioninfoP>전시 정보</ExhibitioninfoP>
              <ExhibitionInfoWrap>
                <ExhibitionInfo>
                  <InfoTitle>위치</InfoTitle>
                  <InfoBox>
                    <span>{info.ExhibitionAddress.address}</span>
                    <span>{info.ExhibitionAddress.zonecode}</span>
                    <span>{info.location}</span>
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>입장료</InfoTitle>
                  <InfoBox>
                    <span>{info.entranceFee}</span>
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>카테고리</InfoTitle>
                  <InfoBox>
                    {info.ExhibitionCategories?.map((theme) => {
                      return (
                        <div key={theme.categoryCode}>
                          <span> {theme.categoryName}</span>
                        </div>
                      );
                    })}
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>작가</InfoTitle>
                  <InfoBox>
                    {info.ExhibitionAuthors?.map((author) => {
                      return (
                        <div key={author.author}>
                          <span>{author.author}</span>
                        </div>
                      );
                    })}
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>작품수</InfoTitle>
                  <InfoBox>
                    <span>{info.artWorkCnt}정</span>
                  </InfoBox>
                </ExhibitionInfo>

                <ExhibitionInfo>
                  <InfoTitle>주최</InfoTitle>
                  <InfoBox>
                    <span>{info.exhibitionHostName}</span>
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>링크</InfoTitle>
                  <InfoBox>
                    <span>{info.exhibitionLink}</span>
                  </InfoBox>
                </ExhibitionInfo>

                <ExhibitionInfo>
                  <InfoTitle>시간</InfoTitle>
                  <InfoBox>
                    <TimesWrap>
                      <span>{info.openTime.slice(0, 5)}</span>
                      <span>-</span>
                      <span>{info.closeTime.slice(0, 5)}</span>
                    </TimesWrap>
                    <span>{info.significant}</span>
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>전화번호</InfoTitle>
                  <InfoBox>
                    <span> Tel:{info.contact}</span>
                  </InfoBox>
                </ExhibitionInfo>

                <ExhibitionInfo noneborder={true}>
                  <InfoTitle>후원</InfoTitle>
                  <InfoBox>
                    <span>{info.agencyAndSponsor}</span>
                  </InfoBox>
                </ExhibitionInfo>
              </ExhibitionInfoWrap>
              <ExhibitioninfoP>작품 사진</ExhibitioninfoP>
              {/* //!이부분은 작성페이지랑 비슷함 컴포넌트 재사용 가능할듯 */}
              <ThumbsContainer>
                {info.ExhibitionImgs?.map((file) => (
                  <div>
                    <Thumb key={file.imgUrl}>
                      <ThumbInner>
                        <Thumbimg src={file.imgUrl} />
                      </ThumbInner>
                    </Thumb>
                  </div>
                ))}
              </ThumbsContainer>
              <ExhibitioninfoP>후기작성</ExhibitioninfoP>
              <ExhibitionReviewForm reviewRef={reviewRef} exhibitionID={id} />
              <ExhibitionReview exhibitionID={id} />
            </Contents>
          </ContentWrap>
        </>
      )}
    </Flex>
  );
}

export default ExhibitionDetail;
const TimesWrap = styled.div`
  display: flex;
  gap: 10px;
`;
const PostsBtnImg = styled.img`
  width: 23px;
  height: 23px;
`;
const Detailspan = styled.span`
  background-color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;

//!중복
const SubmitBtns = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  padding: 36px 0px;
`;

const EXstatusTitle = styled.div`
  color: #ffffff;
  padding-left: 16px;
  margin-left: 16px;
  border-left: 1px solid #ffffff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;
const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  gap: 8px;
  width: 168px;
  height: 168px;
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
  width: 823px;
  display: flex;
  margin-top: 16;
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
    background: linear-gradient(180deg, #3360ff 0%, #b960ff 100%);
  }
`;
const InfoBox = styled.div`
  span {
    font-size: 20px;
  }
  color: #3c3c3c;
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 10px;
`;
const InfoTitle = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  width: 160px;
  box-sizing: border-box;
`;
const ExhibitionInfo = styled.div`
  padding: 32px;
  display: flex;
  border-bottom: ${({ noneborder }) =>
    noneborder ? "none" : "1px dashed #5b5b5b"};
`;
const Icon = styled.div`
  padding: auto;
  font-size: 20px;
`;
const ExhibitioninfoP = styled.p`
  color: #242424;
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  margin-top: 80px;
`;
const ExhibitionInfoWrap = styled.div`
  margin-top: 24px;
  width: 823px;
  border: 1px solid #494949;
  border-radius: 10px;
`;
const ExBtn = styled.div`
  gap: 12px;
  padding: 22px 38px;
  display: flex;
  align-items: center;
  flex: 1;
  border-width: ${(props) => props.iscenter && `0px 1px 0px 1px`};
  border-style: solid;
  border-color: #000000;
  :hover {
    cursor: pointer;
  }
`;
const ArtLinkBtn = styled.button`
  background-color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  align-items: center;
`;
const EXButtons = styled.div`
  width: 493px;
  height: 75px;
  display: flex;
  border-width: 1px 0px 1px 0px;
  padding: 6px 0px;
  border-style: solid;
  border-color: #000000;
  justify-content: space-around;
  margin-top: 15px;
`;

const ExhibitionDescBOX = styled.div`
  width: 823px;
  min-height: 200px;
  margin-top: 50px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #3c3c3c;
`;
const DIV = styled.div`
  background-color: aqua;
  margin-top: 50px;
`;

const SecondTitle = styled.div`
  margin-left: 648px;
  margin-top: 12px;
  height: 39px;
`;

const SecondTitleH2 = styled.h2`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #cecece;
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 648px;
`;
const PostImg = styled.img`
  max-height: 704px;
  max-width: 425px;
  margin-top: 58px;
`;
const ContentWrap = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 1025px;
`;

const BlackBg = styled.div`
  position: fixed;
  background-color: #1b1917;
  height: 328px;
  width: 1675px;
  z-index: 5;
`;

const Date = styled.div`
  display: flex;
  margin-left: 648px;
  margin-top: 60px;
`;

const Title = styled.div`
  margin-left: 648px;
  margin-top: 56px;
`;

const TitleH1 = styled.h1`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 59px;
  letter-spacing: -0.038em;
  color: #ffffff;
`;

const DateP = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
`;

const Contents = styled.div`
  position: relative;
  margin-top: 328px;
  z-index: 3;
`;

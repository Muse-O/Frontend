import React from "react";
import { useDetailGetExibition } from "../../hooks/exhibition/useDetailGetExibition";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Flex } from "../../components/Flex";
import ExhibitionReview from "./ExhibitionReview";
import ExhibitionReviewForm from "./ExhibitionReviewForm";
import ExhibitionLiked from "./ExhibitionLiked";
import ExhibitionScrap from "./ExhibitionScrap";
import { AiOutlineLike, AiOutlineLink, AiFillLike } from "react-icons/ai";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { cookies } from "../../shared/cookies";
function ExhibitionDetail() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [data, isLoading, isError] = useDetailGetExibition(id);
  const info = data?.exhibitionInfo;
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
            </Date>
            <Title>
              <TitleH1>{info.exhibitionTitle}</TitleH1>
            </Title>
            <SecondTitle>
              <SecondTitleH2>부제목 입력 받아야함</SecondTitleH2>
            </SecondTitle>
          </BlackBg>
          <PostWrap>
            <Posts>
              <PostImg src={info.postImage} />
              <EXButtons>
                <ExBtn>
                  {info.liked === 0 ? (
                    <Icon>
                      <AiOutlineLike />
                    </Icon>
                  ) : (
                    <Icon>
                      <AiFillLike />
                    </Icon>
                  )}
                  <ExhibitionLiked exhibitionId={id}>좋아요</ExhibitionLiked>
                </ExBtn>
                <ExBtn iscenter={true}>
                  {info.scraped === 0 ? (
                    <Icon>
                      <BsBookmarkCheck />
                    </Icon>
                  ) : (
                    <Icon>
                      <BsBookmarkCheckFill />
                    </Icon>
                  )}
                  <ExhibitionScrap exhibitionId={id}>스크랩</ExhibitionScrap>
                </ExBtn>
                <ExBtn>
                  <Icon>
                    <AiOutlineLink />
                  </Icon>
                  <ArtLinkBtn>Artgram</ArtLinkBtn>
                </ExBtn>
              </EXButtons>
            </Posts>
          </PostWrap>
          <ContentWrap>
            <Contents>
              <button
                onClick={() =>
                  navigator(`/exhibition/update/${info.exhibitionId}`)
                }
              >
                수정하기
              </button>
              <ExhibitionDescBOX>{info.exhibitionDesc}</ExhibitionDescBOX>
              <ExhibitioninfoP>전시 정보</ExhibitioninfoP>
              <ExhibitionInfoWrap>
                <ExhibitionInfo>
                  <InfoTitle>위치</InfoTitle>
                  <InfoBox>
                    <span>{info.ExhibitionAddress.address}</span>
                    <div>{info?.ExhibitionAddress.zonecode}</div>
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
                  <InfoTitle>분류</InfoTitle>
                  <InfoBox>
                    {info.ExhibitionCategories?.map((theme, index) => {
                      return <span key={index}>{theme.exhibition_code}</span>;
                    })}
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>작가</InfoTitle>
                  <InfoBox>
                    {info.ExhibitionAuthors?.map((author, index) => {
                      return <span key={index}>{author.author_name}</span>;
                    })}
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>작품수</InfoTitle>
                  <InfoBox>
                    <sapn>{info.artWorkCnt}정</sapn>
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>기간</InfoTitle>
                  <InfoBox>
                    <P>시작</P>
                    {info.startDate.slice(0, 10)}
                    <P>끝</P>
                    {info.endDate.slice(0, 10)}
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>전화번호</InfoTitle>
                  <InfoBox>
                    <P>전화번호</P>
                    Tel:{info.contact}
                  </InfoBox>
                </ExhibitionInfo>
                <ExhibitionInfo>
                  <InfoTitle>전시호 테마</InfoTitle>
                  <InfoBox>
                    <P>전시회테마</P>
                    {info.exhibitionStatus}
                  </InfoBox>
                </ExhibitionInfo>
                {/* <DIV>
                  <P>작성자 email</P>
                  {info.userEmail}
                </DIV>
                <DIV>
                  <P>전시회테마</P>
                  {info.exhibitionStatus}
                </DIV>
                <DIV>
                  <P>작성날,수정날</P>
                  {info.createdAt}
                  {info.updatedAt}
                </DIV> */}
              </ExhibitionInfoWrap>
              <ExhibitioninfoP>작품 사진</ExhibitioninfoP>
              {/* //!이부분은 작성페이지랑 비슷함 컴포넌트 재사용 가능할듯 */}
              <ThumbsContainer>
                {info.ExhibitionImgs?.map((file, index) => (
                  <div>
                    <Thumb key={file}>
                      <ThumbInner>
                        <Thumbimg src={file.imgUrl} />
                      </ThumbInner>
                    </Thumb>
                  </div>
                ))}
              </ThumbsContainer>
              <ExhibitioninfoP>후기작성</ExhibitioninfoP>
              <ExhibitionReviewForm exhibitionID={id} />
              <ExhibitionReview exhibitionID={id} />
            </Contents>
          </ContentWrap>
        </>
      )}
    </Flex>
  );
}

export default ExhibitionDetail;
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
    background-color: #244dde;
  }
`;
const InfoBox = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  display: flex;
  flex-direction: column;
`;
const InfoTitle = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  /* padding-right: 120px; */
  width: 160px;
  box-sizing: border-box;
`;
const ExhibitionInfo = styled.div`
  padding: 32px;
  display: flex;
`;
const Icon = styled.div`
  padding: auto;
  font-size: 20px;
`;
const ExhibitioninfoP = styled.p`
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
  flex: 1;
  border-width: ${(props) => props.iscenter && `0px 1px 0px 1px`};
  border-style: solid;
  border-color: #000000;
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
`;
const DIV = styled.div`
  background-color: aqua;
  margin-top: 50px;
`;
const P = styled.p``;

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

// {/* {info && (
//       <>
// <button
//   onClick={() => navigator(`/exhibition/update/${info.exhibitionId}`)}
// >
//   수정하기
// </button>
//     <DIV>
//       <P>주소</P>
//       <div>우편번호{info?.ExhibitionAddress.zonecode}</div>
//       <span>
//         <P>도로명 주소:</P>
//         {info.ExhibitionAddress.address}
//       </span>
//       <span>
//         <P>상세 주소:</P>
//         {info.location}
//       </span>
//     </DIV>
//     <DIV>
//       <P>제목</P>
//       {info.exhibitionTitle}
//     </DIV>
//     <DIV>
//       <P>섬네일</P>
//       <IMG src={info.postImage} />
//     </DIV>
//     <DIV>
//       <P>상세내용</P>
//       {info.ExhibitionImgs?.map((img, index) => {
//         return (
//           <span key={index}>
//             <IMG src={img.imgUrl} />
//             <p>{img.img_caption}</p>
//           </span>
//         );
//       })}
//     </DIV>
//     <DIV>
//       <P>작성자 email</P>
//       {info.userEmail}
//     </DIV>
//     <DIV>
//       <P>내용</P>
//       {info.exhibitionDesc}
//     </DIV>
//     <DIV>
//       <P>작가</P>
//       {info.ExhibitionAuthors?.map((author, index) => {
//         return <span key={index}>{author.author_name}</span>;
//       })}
//     </DIV>
//     <DIV>
//       <P>전시회 카테고리</P>
//       {info.ExhibitionCategories?.map((theme, index) => {
//         return <span key={index}>{theme.exhibition_code}</span>;
//       })}
//     </DIV>
//     <DIV>
//       <P>시작</P>
//       {info.startDate}
//       <P>끝</P>
//       {info.endDate}
//     </DIV>
//     <DIV>
//       <P>가격</P>
//       {info.entranceFee}
//     </DIV>
//     <DIV>
//       <P>작품수</P>
//       {info.artWorkCnt}
//     </DIV>
//     <DIV>
//       <P>전화번호</P>
//       {info.contact}
//     </DIV>
//     <DIV>
//       <P>전시회테마</P>
//       {info.exhibitionStatus}
//     </DIV>
//     <DIV>
//       <P>작성날,수정날</P>
//       {info.createdAt}
//       {info.updatedAt}
//     </DIV>
//   </>
// )} */}

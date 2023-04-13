import React from "react";
import { useDetailGetExibition } from "../../hooks/exhibition/useDetailGetExibition";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Flex } from "../../components/Flex";

function ExhibitionDetail() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [data, isLoading, isError] = useDetailGetExibition(id);
  const info = data?.exhibitionInfo;
  if (isLoading) {
    return <div>로딩중</div>;
  }
  console.log(info);
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
                <button>좋아요</button>
                <button>스크렙</button>
                <button>후기_아트그램 링크</button>
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
              <DIV>
                <P>주소</P>
                <div>우편번호{info?.ExhibitionAddress.zonecode}</div>
                <span>
                  <P>도로명 주소:</P>
                  {info.ExhibitionAddress.address}
                </span>
                <span>
                  <P>상세 주소:</P>
                  {info.location}
                </span>
              </DIV>
              <DIV>
                <P>제목</P>
                {info.exhibitionTitle}
              </DIV>
              <DIV>
                <P>작성자 email</P>
                {info.userEmail}
              </DIV>
              <DIV>
                <P>내용</P>
                {info.exhibitionDesc}
              </DIV>
              <DIV>
                <P>작가</P>
                {info.ExhibitionAuthors?.map((author, index) => {
                  return <span key={index}>{author.author_name}</span>;
                })}
              </DIV>
              <DIV>
                <P>전시회 카테고리</P>
                {info.ExhibitionCategories?.map((theme, index) => {
                  return <span key={index}>{theme.exhibition_code}</span>;
                })}
              </DIV>
              <DIV>
                <P>시작</P>
                {info.startDate}
                <P>끝</P>
                {info.endDate}
              </DIV>
              <DIV>
                <P>가격</P>
                {info.entranceFee}
              </DIV>
              <DIV>
                <P>작품수</P>
                {info.artWorkCnt}
              </DIV>
              <DIV>
                <P>전화번호</P>
                {info.contact}
              </DIV>
              <DIV>
                <P>전시회테마</P>
                {info.exhibitionStatus}
              </DIV>
              <DIV>
                <P>작성날,수정날</P>
                {info.createdAt}
                {info.updatedAt}
              </DIV>
            </Contents>
          </ContentWrap>
        </>
      )}
    </Flex>
  );
}

export default ExhibitionDetail;

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
  background-color: #24e796;
  justify-content: space-around;
  margin-top: 15px;
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
  background: red;
  width: 648px;
`;
const PostImg = styled.img`
  max-height: 704px;
  max-width: 525px;
  margin-top: 58px;
`;
const ContentWrap = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: blue;
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
  background-color: #f6f673e2;
  min-width: 525px;
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

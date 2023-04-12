import React from "react";
import { useDetailGetExibition } from "../../hooks/exhibition/useDetailGetExibition";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

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
    <>
      <button
        onClick={() => navigator(`/exhibition/update/${info.exhibitionId}`)}
      >
        수정하기
      </button>
      {info && (
        <>
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
            <P>섬네일</P>
            <IMG src={info.postImage} />
          </DIV>
          <DIV>
            <P>상세내용</P>
            {info.ExhibitionImgs?.map((img, index) => {
              return (
                <span key={index}>
                  <IMG src={img.imgUrl} />
                  <p>{img.img_caption}</p>
                </span>
              );
            })}
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
        </>
      )}
    </>
  );
}

export default ExhibitionDetail;

const DIV = styled.div`
  background-color: #a6d1f8;
  padding: 10px;
  margin: 0px 10px 10px 10px;
`;
const P = styled.p`
  color: #ffffff;
  margin-bottom: 5px;
`;

const IMG = styled.img`
  width: 100px;
  /* height: 10px; */
`;

import styled from "styled-components";
import ExhibitionReviewForm from "./ExhibitionReviewForm";
import ExhibitionReview from "./ExhibitionReview";
import { ContentsTable } from "./ContentsTable";
import { ContentsImgs } from "./ContentsImgs";

export const Contents = ({ info, id, reviewRef }) => {
  return (
    <ContentWrap>
      <Content>
        <ExhibitionDescBOX>{info.exhibitionDesc}</ExhibitionDescBOX>
        <ContentsTable info={info} />
        <ContentsImgs info={info} />
        <ExhibitionReviewForm reviewRef={reviewRef} exhibitionID={id} />
        <ExhibitionReview exhibitionID={id} />
      </Content>
    </ContentWrap>
  );
};

// 전시정보랑 후기 작품사진 랑 겹침
const ExhibitioninfoP = styled.p`
  color: #242424;
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 25px;
  margin-top: 80px;
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

const ContentWrap = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 1025px;
`;

const Content = styled.div`
  position: relative;
  margin-top: 328px;
  z-index: 3;
`;

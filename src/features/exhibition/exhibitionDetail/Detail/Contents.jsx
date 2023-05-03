import styled from "styled-components";
import ExhibitionReviewForm from "./ExhibitionReviewForm";
import ExhibitionReview from "./ExhibitionReview";

export const Contents = ({ info, id, reviewRef }) => {
  return (
    <ContentWrap>
      <Content>
        <ExhibitionDescBOX>{info.exhibitionDesc}</ExhibitionDescBOX>
        <ExhibitioninfoP>전시 정보</ExhibitioninfoP>
        <ExhibitionInfoWrap>
          {info.location && (
            <ExhibitionInfo>
              <InfoTitle>위치</InfoTitle>
              <InfoBox>
                <span>{info.ExhibitionAddress.address}</span>
                <span>{info.ExhibitionAddress.zonecode}</span>
                <span>{info.location}</span>
              </InfoBox>
            </ExhibitionInfo>
          )}
          {info.exhibitionKind === "EK0001" && (
            <ExhibitionInfo>
              <InfoTitle>입장료</InfoTitle>
              <InfoBox>
                <span>{info.entranceFee}</span>
              </InfoBox>
            </ExhibitionInfo>
          )}
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
          {info.artWorkCnt && (
            <ExhibitionInfo>
              <InfoTitle>작품수</InfoTitle>
              <InfoBox>
                <span>{info.artWorkCnt}정</span>
              </InfoBox>
            </ExhibitionInfo>
          )}
          <ExhibitionInfo>
            <InfoTitle>주최</InfoTitle>
            <InfoBox>
              <span>{info.exhibitionHostName}</span>
            </InfoBox>
          </ExhibitionInfo>
          {info.exhibitionLink && (
            <ExhibitionInfo>
              <InfoTitle>링크</InfoTitle>
              <InfoBox>
                <span>{info.exhibitionLink}</span>
              </InfoBox>
            </ExhibitionInfo>
          )}
          {info.exhibitionKind === "EK0001" && (
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
          )}
          {info.contact && (
            <ExhibitionInfo>
              <InfoTitle>전화번호</InfoTitle>
              <InfoBox>
                <span> Tel:{info.contact}</span>
              </InfoBox>
            </ExhibitionInfo>
          )}
          {info.agencyAndSponsor && (
            <ExhibitionInfo>
              <InfoTitle>후원</InfoTitle>
              <InfoBox>
                <span>{info.agencyAndSponsor}</span>
              </InfoBox>
            </ExhibitionInfo>
          )}
          <ExhibitionInfo noneborder={true}>
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
        </ExhibitionInfoWrap>

        {info.ExhibitionImgs.length !== 0 && (
          <>
            <ExhibitioninfoP>작품 사진</ExhibitioninfoP>
            {/* 컴포넌트 재활용 가능성있음 */}
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
          </>
        )}
        <ExhibitioninfoP>후기작성</ExhibitioninfoP>
        <ExhibitionReviewForm reviewRef={reviewRef} exhibitionID={id} />
        <ExhibitionReview exhibitionID={id} />
      </Content>
    </ContentWrap>
  );
};

const TimesWrap = styled.div`
  display: flex;
  gap: 10px;
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
    background-color: #888;
    border-radius: 4px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
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

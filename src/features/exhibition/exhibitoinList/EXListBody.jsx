import styled from "styled-components";
import location from "../../../assets/imgs/exhibition/location.png";
import tickets from "../../../assets/imgs/exhibition/tickets.png";
import artist from "../../../assets/imgs/exhibition/artist.png";
import sparkle_gray from "../../../assets/imgs/exhibition/sparkle_gray.png";
import { useNavigate } from "react-router-dom";
export const EXListBody = ({ isLoading, isError, merged }) => {
  const navigator = useNavigate();
  return (
    <>
      {isLoading || isError ? (
        <div>로딩 중...</div>
      ) : merged.length !== 0 ? (
        merged.map((item) => (
          <ExhibitionItem key={item.exhibitionId}>
            <ImageBox src={item.postImage} />
            <ExhibitionInfoBox>
              <ExhibitionDate>
                {item.startDate.slice(2, 10).replace(/-/g, ".") +
                  " - " +
                  item.endDate.slice(2, 10).replace(/-/g, ".")}
                {item.address?.split(" ").slice(0, 2).join(" ")}
              </ExhibitionDate>
              <ExSate>
                {item.exhibitionStatus === "전시 진행"
                  ? "Now On View"
                  : item.exhibitionStatus === "전시 예정"
                  ? "Coming Soon"
                  : item.exhibitionStatus === "전시 종료"
                  ? "Exhibition is over"
                  : ""}
              </ExSate>
              <ExhibitionTitleWrap>
                <Excategoryname>{item.categoryCodeName[0]}</Excategoryname>
                <ExhibitonTitle>{item.exhibitionTitle}</ExhibitonTitle>
                <ExhibitonSecondTitle>
                  {item.exhibitionEngTitle}
                </ExhibitonSecondTitle>
              </ExhibitionTitleWrap>
            </ExhibitionInfoBox>
            <ExhibitionInfoDetailBox>
              <ExhibitionDatailInfo>
                <DatailInfo>
                  <InfoBox>
                    <Info>
                      <Items>
                        <EmoticonImg src={location} />
                        <span>장소</span>
                      </Items>
                      <InfoText>{item.location}</InfoText>
                    </Info>
                    <Info>
                      <Items>
                        <EmoticonImg src={tickets} />
                        <span>관람료</span>
                      </Items>
                      <InfoText>{item.entranceFee}</InfoText>
                    </Info>
                  </InfoBox>
                  <InfoBox>
                    <Info>
                      <Items>
                        <EmoticonImg src={artist} />
                        <span>작가</span>
                      </Items>
                      <InfoText>{item.authorNickName}</InfoText>
                    </Info>
                    <Info>
                      <Items>
                        <EmoticonImg src={sparkle_gray} />
                        <span>평점</span>
                      </Items>
                      <InfoText>{item.reviewAvgRating}</InfoText>
                    </Info>
                  </InfoBox>
                </DatailInfo>
                <ExhibitionHashTag>
                  {item.tagName
                    ?.sort(() => Math.random() - 0.5)
                    .slice(0, 5)
                    .map((tag) => {
                      return <span key={tag}>{tag}</span>;
                    })}
                </ExhibitionHashTag>
              </ExhibitionDatailInfo>
              <ExhibitionMore
                onClick={() => {
                  navigator(`/exhibition/detail/${item.exhibitionId}`);
                }}
              >
                <span>M</span>
                <span>O</span>
                <span>R</span>
                <span>E</span>
              </ExhibitionMore>
            </ExhibitionInfoDetailBox>
          </ExhibitionItem>
        ))
      ) : (
        <NoneData>데이터가 없습니다</NoneData>
      )}
    </>
  );
};

const ExhibitionItem = styled.div`
  display: flex;
  box-sizing: border-box;
  font-size: 25px;
  height: 380px;
  background: #f7f7f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
`;

const ImageBox = styled.img`
  width: 266px;
  height: auto;
  object-fit: cover;
`;

const ExhibitionInfoBox = styled.div`
  font-size: 1em; //!부모 따라가기 em이랑 rem
  max-width: 690px;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 40px;
  position: relative;
`;

const ExhibitionDate = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #242424;
`;

const ExhibitionTitleWrap = styled.div`
  gap: 6px;
  position: absolute;
  bottom: 63px;
  right: 42px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ExhibitionDatailInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-left: 1px dashed gray;
  padding: 60px 80px;
  box-sizing: border-box;
`;

const ExhibitionMore = styled.div`
  display: flex;
  max-width: 76px;
  flex: 1;
  flex-direction: column;
  border-left: 1px dashed gray;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  gap: 3px;
  span {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    padding: 3px 20px;
  }
  transition: background 1s ease, color 1s ease;
  :hover {
    cursor: pointer;
    background: #242424;
    color: #ffffff;
  }
`;

const ExhibitionInfoDetailBox = styled.div`
  max-width: 569px;
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const NoneData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  height: 500px;
`;
const Items = styled.div`
  display: flex;
`;

const InfoText = styled.p`
  margin-left: 25px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: #3c3c3c;
`;
const EmoticonImg = styled.img`
  width: 17px;
  height: 17px;
`;
const ExSate = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  background: linear-gradient(180deg, #3360ff 0%, #b960ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const Excategoryname = styled.span`
  color: #5a5a5a;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
`;
const HiddenRef = styled.div`
  margin-top: 10px;
  color: transparent;
`;
const ExhibitionWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 40px;
  box-sizing: border-box;
  padding: 0 76px;
  overflow: hidden;
`;
const Info = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
    color: #242424;
  }
`;
const DatailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 200px;
`;
const ExhibitionHashTag = styled.div`
  padding: 0px 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    background: linear-gradient(180deg, #3360ff 0%, #b960ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;
const ExhibitonTitle = styled.span`
  font-family: "S-Core Dream";
  font-style: normal;
  font-weight: 500;
  font-size: 3em;
  line-height: 38px;
  color: #000000;
`;
const ExhibitonSecondTitle = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
`;

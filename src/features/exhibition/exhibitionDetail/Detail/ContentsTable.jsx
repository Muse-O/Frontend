import styled from "styled-components";
import { InfoTable } from "./InfosTable";
import { ExhibitioninfoP } from "../css/ReviewsDetail";

export const ContentsTable = ({ info }) => {
  return (
    <>
      <ExhibitioninfoP>전시 정보</ExhibitioninfoP>
      <ExhibitionInfoWrap>
        {info.location && (
          <InfoTable title={"위치"}>
            <span>{info.ExhibitionAddress.address}</span>
            <span>{info.ExhibitionAddress.zonecode}</span>
            <span>{info.location}</span>
          </InfoTable>
        )}
        {info.exhibitionKind === "EK0001" && (
          <InfoTable title={"입장료"}>
            <span>{info.entranceFee}</span>
          </InfoTable>
        )}
        <InfoTable title={"카테고리"}>
          {info.ExhibitionCategories?.map((theme) => {
            return (
              <div key={theme.categoryCode}>
                <span> {theme.categoryName}</span>
              </div>
            );
          })}
        </InfoTable>
        {info.artWorkCnt && (
          <InfoTable title={"작품수"}>
            <span>{info.artWorkCnt}정</span>
          </InfoTable>
        )}
        <InfoTable title={"주최"}>
          <span>{info.exhibitionHostName}</span>
        </InfoTable>

        {info.exhibitionLink && (
          <InfoTable title={"링크"}>
            <span>{info.exhibitionLink}</span>
          </InfoTable>
        )}
        {info.exhibitionKind === "EK0001" && (
          <InfoTable title={"시간"}>
            <TimesWrap>
              <span>{info.openTime.slice(0, 5)}</span>
              <span>-</span>
              <span>{info.closeTime.slice(0, 5)}</span>
            </TimesWrap>
            <span>{info.significant}</span>
          </InfoTable>
        )}
        {info.contact && (
          <InfoTable title={"전화번호"}>
            <span> Tel:{info.contact}</span>
          </InfoTable>
        )}
        {info.agencyAndSponsor && (
          <InfoTable title={"후원"}>
            <span>{info.agencyAndSponsor}</span>
          </InfoTable>
        )}
        <InfoTable title={"작가"}>
          {info.ExhibitionAuthors?.map((author) => {
            return (
              <div key={author.author}>
                <span>{author.author}</span>
              </div>
            );
          })}
        </InfoTable>
      </ExhibitionInfoWrap>
    </>
  );
};

const ExhibitionInfoWrap = styled.div`
  margin-top: 24px;
  width: 823px;
  border: 1px solid #494949;
  border-radius: 10px;
`;
const TimesWrap = styled.div`
  display: flex;
  gap: 10px;
`;

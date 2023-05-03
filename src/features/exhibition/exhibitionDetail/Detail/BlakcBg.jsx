import styled from "styled-components";
import { ExSatus } from "../../EXstatusTitle";

export const TitleBackGround = ({ info }) => {
  return (
    <BlackBg>
      <Date>
        <DateP>
          {info.startDate.slice(0, 10).replace(/-/g, ".")}-
          {info.endDate.slice(0, 10).replace(/-/g, ".")}
        </DateP>
        <EXstatusTitle>{info.exhibitionKindName}</EXstatusTitle>
        <EXstatusTitle status={"info"}>
          <ExSatus info={info} />
        </EXstatusTitle>
      </Date>
      <Title>
        <TitleH1>{info.exhibitionTitle}</TitleH1>
      </Title>
      <SecondTitle>
        <SecondTitleH2>{info.exhibitionEngTitle}</SecondTitleH2>
      </SecondTitle>
    </BlackBg>
  );
};
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

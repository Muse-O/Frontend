import styled from "styled-components";

export const InfoTable = ({ title, children }) => {
  return (
    <ExhibitionInfo title={title}>
      <InfoTitle>{title}</InfoTitle>
      <InfoBox>{children}</InfoBox>
    </ExhibitionInfo>
  );
};
const ExhibitionInfo = styled.div`
  padding: 32px;
  display: flex;
  border-bottom: ${({ title }) =>
    title === "작가" ? "none" : "1px dashed #5b5b5b"};
`;
const InfoTitle = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  width: 160px;
  box-sizing: border-box;
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

<InfoTable title={"위치"}></InfoTable>;

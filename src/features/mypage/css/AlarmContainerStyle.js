import styled from "styled-components";

const StAlramContainer = styled.div`
  width: 392px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 1440px) {
    width: 294px;
    gap: 3px;
  }
`;

const StAlramTitle = styled.div`
  display: flex;
  margin-bottom: 24px;
  gap: 4px;

  @media (max-width: 1440px) {
    margin-bottom: 18px;
    gap: 3px;
  }
`;

const AlramTitle = styled.div`
  font-family: "S-CoreDream-3Light";
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  @media (max-width: 1440px) {
    font-size: 18px;
  }
`;

const StBell = styled.div`
  width: 23px;
  height: 23px;

  @media (max-width: 1440px) {
    width: 17.25px;
    height: 17.25px;
  }

  img {
    width: 23px;
    height: 23px;

    @media (max-width: 1440px) {
      width: 17.25px;
      height: 17.25px;
    }
  }
`;

const StAlramBox = styled.div`
  background-color: white;
  width: 392px;
  height: 469px;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  @media (max-width: 1440px) {
    width: 294px;
    height: 350px;
  }
`;

const StAlramWrap = styled.div`
  width: 392px;
  height: 66px;
  padding: 10px;
  margin-bottom: 1px;
  cursor: pointer;

  @media (max-width: 1440px) {
    width: 294px;
    height: 49.5px;
    padding: 7.5px;
    margin-bottom: 1px;
  }

  div {
    display: flex;
  }
`;

const StIconWrap = styled.div`
  background-color: #ffffff;
  width: 42px;
  height: 42px;
  border: 1px solid #cccccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 13px;

  @media (max-width: 1440px) {
    width: 31.5px;
    height: 31.5px;
    margin-right: 9.75px;
  }

  img {
    width: 22px;
    height: 22px;

    @media (max-width: 1440px) {
      width: 16.5px;
      height: 16.5px;
    }
  }
`;

const StAlramContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const StAlramTheme = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 7px;

  @media (max-width: 1440px) {
    font-size: 10.5px;
    margin-bottom: 5.25px;
  }
`;

const StAlramContent = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 12px;
  font-weight: 400;
  color: #3c3c3c;
  letter-spacing: -0.003em;

  @media (max-width: 1440px) {
    font-size: 9px;
  }
`;

export {
  StAlramContainer,
  StAlramTitle,
  AlramTitle,
  StBell,
  StAlramBox,
  StAlramWrap,
  StIconWrap,
  StAlramContents,
  StAlramTheme,
  StAlramContent,
};

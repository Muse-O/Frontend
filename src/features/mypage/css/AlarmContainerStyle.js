import styled from "styled-components";

const StAlramContainer = styled.div`
  width: 392px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StAlramTitle = styled.div`
  display: flex;
  margin-bottom: 24px;
  gap: 4px;
`;

const AlramTitle = styled.div`
  font-family: "S-CoreDream-3Light";
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const StBell = styled.div`
  width: 23px;
  height: 23px;

  img {
    width: 23px;
    height: 23px;
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
`;

const StAlramWrap = styled.div`
  width: 392px;
  height: 66px;
  padding: 10px;
  margin-bottom: 1px;
  cursor: pointer;

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

  img {
    width: 22px;
    height: 22px;
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
`;

const StAlramContent = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 12px;
  font-weight: 400;
  color: #3c3c3c;
  letter-spacing: -0.003em;
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

import styled from "styled-components";
import whiteLeftArrow from "../../../assets/imgs/mypage/WhiteLeftArrow.svg";
import blackLeftArrow from "../../../assets/imgs/mypage/blackLeftArrow.svg";

const StContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
`;

const StArtgram = styled.div`
  font-family: "S-CoreDream-3Light";
  font-weight: bold;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StArtgramBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 1010px;
  height: 404px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StImgBtnBox = styled.div`
  width: 1070px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const StLeftBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eeeeee;
  background-image: url(${blackLeftArrow});
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:disabled {
    cursor: default;
    background-image: url(${whiteLeftArrow});
    background-repeat: no-repeat;
    background-position: center;
  }

  /* disabled 상태가 아닐 때만 hover 했을 때 배경색이 바뀜 */
  &:not(:disabled):hover {
    background-color: #242424;
    background-image: url(${whiteLeftArrow});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const StLeftImg = styled.img`
  width: 14px;
  height: 22px;
  transform: rotate(-180deg);
`;

const StRightBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eeeeee;
  background-image: url(${blackLeftArrow});
  background-repeat: no-repeat;
  background-position: center;
  transform: rotate(-180deg);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:disabled {
    cursor: default;
    background-image: url(${whiteLeftArrow});
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(-180deg);
  }

  /* disabled 상태가 아닐 때만 hover 했을 때 배경색이 바뀜 */
  &:not(:disabled):hover {
    background-color: #242424;
    background-image: url(${whiteLeftArrow});
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(-180deg);
  }
`;

const StRightImg = styled.img`
  width: 14px;
  height: 22px;
`;

const StWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 970px; */
`;

const StTabWrap = styled.div`
  width: 450px;
  height: 63px;
  display: flex;
  align-items: center;
  margin-left: 55px;
  gap: 36px;
`;

const StTab = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  font-family: "SpoqaHanSansNeo-Regular";
  font-weight: bold;
  font-size: 16px;

  color: ${({ select }) => (select ? "#242424" : "#7E7E7E")};
`;

const StTabCount = styled.div`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 12px;
  width: 32px;
  height: 25px;
  border-radius: 30px;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ selectCount }) => (selectCount ? "#EEEEEE" : "#7E7E7E")};
  background-color: ${({ selectCount }) =>
    selectCount ? "#242424" : "#EEEEEE"};
`;

const StImgBox = styled.div`
  width: 964px;
  height: 261px;
  /* background-color: #80808089; */
  display: flex;
  gap: 12px;
`;

const StImgWrap = styled.div`
  background-color: #2c2c2c;
  width: 313px;
  height: 315px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StImg = styled.img`
  max-width: 313px;
  max-height: 315px;
  background: #2c2c2c;
`;

export {
  StContainer,
  StArtgram,
  StArtgramBox,
  StImgBtnBox,
  StLeftBtn,
  StLeftImg,
  StRightBtn,
  StRightImg,
  StWrap,
  StTabWrap,
  StTab,
  StTabCount,
  StImgBox,
  StImgWrap,
  StImg,
};

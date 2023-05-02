import styled from "styled-components";
import whiteLeftArrow from "../../../assets/imgs/mypage/WhiteLeftArrow.svg";
import blackLeftArrow from "../../../assets/imgs/mypage/blackLeftArrow.svg";

const StContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1440px) {
    margin-top: 18.75px;
  }
`;

const StArtgram = styled.div`
  font-family: "S-CoreDream-3Light";
  font-weight: bold;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 1440px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

const StArtgramBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 1010px;
  height: 404px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1440px) {
    width: 757.5px;
    height: 303px;
  }
`;

const StImgBtnBox = styled.div`
  width: 1070px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @media (max-width: 1440px) {
    width: 802.5px;
    gap: 3.75px;
  }
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

  @media (max-width: 1440px) {
    width: 30px;
    height: 30px;
  }

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

  @media (max-width: 1440px) {
    width: 18.6px;
    height: 16.5px;
  }
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

  @media (max-width: 1440px) {
    width: 30px;
    height: 30px;
  }

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

  @media (max-width: 1440px) {
    width: 18.6px;
    height: 16.5px;
  }
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

  @media (max-width: 1440px) {
    width: 337.5px;
    height: 47.25px;
    margin-left: 41.25px;
    gap: 27px;
  }
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

  @media (max-width: 1440px) {
    gap: 3px;
    font-size: 12px;
  }
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

  @media (max-width: 1440px) {
    font-size: 9px;
    width: 24px;
    height: 18.75px;
  }
`;

const StImgBox = styled.div`
  width: 964px;
  height: 261px;
  display: flex;
  gap: 12px;

  @media (max-width: 1440px) {
    width: 723px;
    height: 195.75px;
    gap: 9px;
  }
`;

const StImgWrap = styled.div`
  background-color: #eeeeee;
  width: 313px;
  height: 315px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1440px) {
    width: 234.75px;
    height: 236.25px;
  }
`;

const StImg = styled.img`
  max-width: 313px;
  max-height: 315px;
  background: #2c2c2c;

  @media (max-width: 1440px) {
    max-width: 234.75px;
    max-height: 236.25px;
  }
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

import styled from "styled-components";

const StUserProfileModal = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  height: 665px;
  background-color: white;
  border-radius: 20px;
  position: fixed;
  z-index: 10201;
  top: 15%;
  left: 35%;

  @media (max-width: 1440px) {
    width: 562.5px;
    height: 498.75px;
    top: 11.25%;
    left: 35%;
  }
`;

const StCloseBtn = styled.div`
  display: flex;
  width: 700px;
  height: 68px;
  justify-content: end;
  align-items: center;
  cursor: pointer;

  @media (max-width: 1440px) {
    width: 525px;
    height: 51px;
  }

  img {
    width: 30px;
    height: 30px;

    @media (max-width: 1440px) {
      width: 22.5px;
      height: 22.5px;
    }
  }
`;

const StImgContainer = styled.div`
  width: 750px;
  height: 150px;
  padding-left: 68px;
  margin-bottom: 48px;

  @media (max-width: 1440px) {
    width: 562.5px;
    height: 112.5px;
    padding-left: 51px;
    margin-bottom: 36px;
  }
`;

const StImgBox = styled.div`
  width: 570px;
  height: 150px;
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;

  @media (max-width: 1440px) {
    width: 427.5px;
    height: 112.5px;
    gap: 22.5px;
    margin-bottom: 15px;
  }
`;

const StInput = styled.input`
  display: none;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;

  @media (max-width: 1440px) {
    width: 112.5px;
    height: 112.5px;
  }
`;

const StImgEditWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1440px) {
    gap: 7.5px;
  }
`;

const UpdateIcon = styled.button`
  font-family: "SpoqaHanSansNeo-Regular";
  background-color: white;
  border: 1px solid gray;
  width: 154px;
  height: 44px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  cursor: pointer;

  @media (max-width: 1440px) {
    width: 115.5px;
    height: 33px;
    gap: 6px;
    font-size: 9px;
  }

  div {
    font-size: 12px;

    @media (max-width: 1440px) {
      font-size: 9px;
    }
  }

  img {
    width: 12px;
    height: 12px;

    @media (max-width: 1440px) {
      width: 9px;
      height: 9px;
    }
  }
`;

const StTextBox = styled.div`
  /* background-color: #ffc0cb62; */
  width: 543px;
  height: 250px;
  display: flex;
  justify-content: space-around;

  @media (max-width: 1440px) {
    width: 407.25px;
    height: 187.5px;
  }
`;

const StEditInputNameWrap = styled.div`
  width: 54px;
  height: 100px;
  padding: 13px 0px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  /* margin-right: 61px; */

  @media (max-width: 1440px) {
    width: 40.5px;
    height: 75px;
    padding: 9.75px 0px;
    gap: 45px;
  }

  div {
    width: 70px;
    font-size: 17px;
    font-weight: bold;

    @media (max-width: 1440px) {
      width: 52.5px;
      font-size: 12.75px;
    }
  }
`;

const StEditInputWrap = styled.div`
  /* background-color: #5fa75f44; */
  width: 380px;
  height: 230px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 1440px) {
    width: 285px;
    height: 172.5px;
    gap: 3.75px;
  }
`;

const NameInput = styled.input`
  font-family: "Montserrat", sans-serif;
  border: 1px solid #cccccc;
  width: 428px;
  height: 41px;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  outline: none;

  @media (max-width: 1440px) {
    width: 321px;
    height: 30.75px;
    padding: 7.5px;
    font-size: 12px;
  }
`;

const IntroInput = styled.textarea`
  font-family: "SpoqaHanSansNeo-Regular";
  border: 1px solid #cccccc;
  width: 406px;
  height: 164px;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  white-space: pre-line;
  resize: none;
  outline: none;

  @media (max-width: 1440px) {
    width: 304.5px;
    height: 123px;
    margin-top: 15px;
    padding: 7.5px;
    font-size: 12px;
    line-height: 18.75px;
  }
`;

const StUpdateBtn = styled.div`
  border: 1px solid gray;
  border-radius: 30px;
  width: 238px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;

  @media (max-width: 1440px) {
    width: 178.5px;
    height: 37.5px;
    font-size: 12px;
    margin-top: 26.25px;
  }
`;

export {
  StUserProfileModal,
  StCloseBtn,
  StImgContainer,
  StImgBox,
  StInput,
  ProfileImg,
  StImgEditWrap,
  UpdateIcon,
  StTextBox,
  StEditInputNameWrap,
  StEditInputWrap,
  NameInput,
  IntroInput,
  StUpdateBtn,
};

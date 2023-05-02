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
`;

const StCloseBtn = styled.div`
  display: flex;
  width: 700px;
  height: 68px;
  justify-content: end;
  align-items: center;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
  }
`;

const StImgContainer = styled.div`
  width: 750px;
  height: 150px;
  padding-left: 68px;
  margin-bottom: 48px;
`;

const StImgBox = styled.div`
  width: 570px;
  height: 150px;
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 20px;
`;

const StInput = styled.input`
  display: none;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const StImgEditWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

  div {
    font-size: 12px;
  }

  img {
    width: 12px;
    height: 12px;
  }
`;

const StTextBox = styled.div`
  /* background-color: #ffc0cb62; */
  width: 543px;
  height: 250px;
  display: flex;
  justify-content: space-around;
`;

const StEditInputNameWrap = styled.div`
  width: 54px;
  height: 100px;
  padding: 13px 0px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  /* margin-right: 61px; */

  div {
    width: 70px;
    font-size: 17px;
    font-weight: bold;
  }
`;

const StEditInputWrap = styled.div`
  /* background-color: #5fa75f44; */
  width: 380px;
  height: 230px;
  display: flex;
  flex-direction: column;
  gap: 5px;
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

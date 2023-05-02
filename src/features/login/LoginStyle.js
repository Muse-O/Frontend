import styled from "styled-components";
import { Link } from "react-router-dom";

const StLogin = styled.form`
  font-family: "SpoqaHanSansNeo-Regular";
  width: 616px;
  height: 779px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 20px 0px rgba(148, 148, 148, 0.25);
`;

const StLinkBox = styled.div`
  background-color: white;
  width: 217px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`;

const StEmailInputBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 69px 0px 26px;

  label {
    color: #242424;
    font-size: 15px;
    font-weight: bold;
  }
`;

const StEmailInputWrap = styled.div`
  width: 416px;
  height: 48px;

  input {
    font-family: "Montserrat", sans-serif;
    width: 416px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    margin-bottom: 5px;
  }

  div {
    color: #f65959;
  }
`;

const StPwInputBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;

  label {
    color: #242424;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

const StPwInputWrap = styled.div`
  width: 416px;
  height: 48px;

  div {
    color: #f65959;
  }
`;

const StPwInputImgWrap = styled.div`
  input {
    font-family: "Montserrat", sans-serif;
    width: 416px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    position: absolute;
  }

  img {
    width: 20px;
    height: 20px;
    transform: translate(385px, 12px);
    cursor: pointer;
  }
`;

const StPwWarning = styled.div`
  color: #f65959;
  height: 9px;
`;

const StLoginBtn = styled.button`
  font-family: "SpoqaHanSansNeo-Regular";
  background-color: white;
  color: #171717;
  width: 416px;
  height: 65px;
  border: 1px solid gray;
  border-radius: 50px;
  font-size: 15px;
  font-weight: bold;
  margin: 44px 0px 72px;
  cursor: pointer;

  &:hover {
    border: none;
    background-color: #242424;
    color: white;
  }
`;

const StSnsBox = styled.div`
  width: 195px;
  height: 86px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
  }
`;

const StSnsBtnWrap = styled.div`
  display: flex;
  gap: 16px;

  div {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const GoogleLogoDiv = styled.div`
  background-color: #f65959;
  /* border: 1px solid rgba(148, 148, 148, 0.25); */
`;

const StRegisterLink = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 12px;

  div {
    font-size: 16px;
    color: #5a5a5a;
  }
`;

const StLink = styled(Link)`
  font-size: 16px;
  color: #3360ff;
`;

export {
  StLogin,
  StLinkBox,
  StEmailInputBox,
  StEmailInputWrap,
  StPwInputBox,
  StPwInputWrap,
  StPwInputImgWrap,
  StPwWarning,
  StLoginBtn,
  StSnsBox,
  StSnsBtnWrap,
  GoogleLogoDiv,
  StRegisterLink,
  StLink,
};

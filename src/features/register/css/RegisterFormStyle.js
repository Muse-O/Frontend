import styled from "styled-components";

const StRegister = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
  background-color: white;
  border-radius: 10px;
  width: 616px;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 20px 0px rgba(148, 148, 148, 0.25);
`;

const StRegisterWrap = styled.div`
  width: 416px;
  height: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StLinkBox = styled.div`
  background-color: white;
  width: 217px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 52px 0px 36px 0px;
`;

const StEmailWrap = styled.div`
  width: 416px;
  height: 260px;
  display: flex;
  flex-direction: column;
`;

const StEmailInputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    height: 12px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  input {
    font-family: "Montserrat", sans-serif;
    width: 329px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    margin-right: 8px;
  }

  button {
    /* background-color: white; */
    /* color: #3c3c3c; */
    border: 1px solid;
    border-radius: 5px;
    width: 79px;
    height: 44px;
    font-size: 12px;
    font-family: "SpoqaHanSansNeo-Regular";
    cursor: pointer;
  }
`;

const StEmailInputBtn = styled.div`
  width: 416px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const StEmailInputWarning = styled.div`
  width: 416px;
  height: 9px;
  display: flex;
  align-items: center;
  color: #f65959;
  margin-bottom: 15px;

  div {
    font-size: 12px;
  }
`;

const StEmailValidationBox = styled.div`
  display: flex;
  flex-direction: column;

  label {
    height: 12px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

const StEmailAuthBox = styled.div`
  width: 436px;
  display: flex;

  input {
    font-family: "Montserrat", sans-serif;
    width: 299px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    margin-right: 8px;
    position: relative;

    &::placeholder {
      color: #cccccc;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
    }
  }

  button {
    background-color: white;
    color: #3c3c3c;
    border: 1px solid #3c3c3c;
    border-radius: 5px;
    width: 109px;
    height: 44px;
    font-size: 12px;
    font-family: "SpoqaHanSansNeo-Regular";
    cursor: pointer;
    margin-bottom: 8px;
  }
`;

const StCount = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  color: #f65959;
  width: 20px;
  height: 20px;
  position: absolute;
  transform: translate(260px, 15px);
`;

const StEmailAuthBtn = styled.button`
  background-color: white;
  color: #3c3c3c;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  width: 416px;
  height: 44px;
  font-size: 12px;
  font-family: "SpoqaHanSansNeo-Regular";
  cursor: pointer;
  margin-bottom: 8px;
`;

const StEmailAuthWarning = styled.div`
  width: 416px;
  height: 9px;
  display: flex;
  align-items: center;
  color: #f65959;
  margin-bottom: 15px;

  div {
    font-size: 12px;
  }
`;

const StPwWrap = styled.div`
  width: 416px;
  height: 208px;
  display: flex;
  flex-direction: column;
`;

const StPwContainer = styled.div`
  width: 416px;
  height: 104px;
  display: flex;
  flex-direction: column;

  label {
    height: 12px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  input {
    font-family: "Montserrat", sans-serif;
    width: 416px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    margin-right: 8px;

    &::placeholder {
      color: #cccccc;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      letter-spacing: 0;
    }
  }
`;

const StPwConfirmContainer = styled.div`
  width: 416px;
  height: 104px;
  display: flex;
  flex-direction: column;

  label {
    height: 12px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  input {
    font-family: "Montserrat", sans-serif;
    width: 416px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    margin-right: 8px;
  }
`;

const StPwInputImgWrap = styled.div`
  margin-bottom: 26px;

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

const StPwInputWarning = styled.div`
  width: 416px;
  height: 9px;
  display: flex;
  align-items: center;
  color: #f65959;
  margin: 8px 0px 15px 0px;
  font-size: 12px;
`;

const StPwCheckWarning = styled.div`
  width: 416px;
  height: 9px;
  display: flex;
  align-items: center;
  color: #f65959;
  margin-top: 8px;
  font-size: 12px;
`;

const StNickNameBox = styled.div`
  width: 416px;
  height: 89px;
  display: flex;
  flex-direction: column;

  label {
    height: 12px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  input {
    font-family: "Montserrat", sans-serif;
    width: 416px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    margin-right: 8px;

    &::placeholder {
      color: #cccccc;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
    }
  }
`;

const StNickNameWarning = styled.div`
  width: 416px;
  height: 9px;
  display: flex;
  align-items: center;
  color: #f65959;
  margin-top: 8px;
  font-size: 12px;
`;

const StRegisterBtn = styled.button`
  margin-top: 40px;
  background-color: white;
  text-decoration: none;
  font-weight: bold;
  color: #171717;
  width: 416px;
  height: 65px;
  border-radius: 50px;
  border: 1px solid #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 16px;
  cursor: pointer;

  &:hover {
    border: none;
    background-color: #242424;
    color: white;
  }
`;

export {
  StRegister,
  StRegisterWrap,
  StLinkBox,
  StEmailWrap,
  StEmailInputBox,
  StEmailInputBtn,
  StEmailInputWarning,
  StEmailValidationBox,
  StEmailAuthBox,
  StCount,
  StEmailAuthBtn,
  StEmailAuthWarning,
  StPwWrap,
  StPwContainer,
  StPwConfirmContainer,
  StPwInputImgWrap,
  StPwInputWarning,
  StPwCheckWarning,
  StNickNameBox,
  StNickNameWarning,
  StRegisterBtn,
};

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

  @media (max-width: 1440px) {
    border-radius: 7.5px;
    width: 462px;
    height: 639px;
  }
`;

const StRegisterWrap = styled.div`
  width: 416px;
  /* height: 700px; */
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1440px) {
    width: 312px;
  }
`;

const StLinkBox = styled.div`
  background-color: white;
  width: 217px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 52px 0px 36px 0px;

  @media (max-width: 1440px) {
    width: 162.75px;
    height: 37.5px;
    margin: 39px 0px 27px 0px;
  }
`;

const StEmailWrap = styled.div`
  width: 416px;
  height: 260px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1440px) {
    width: 312px;
    height: 195px;
  }
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

    @media (max-width: 1440px) {
      height: 9px;
      font-size: 12px;
      margin-bottom: 12px;
    }
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

    @media (max-width: 1440px) {
      width: 246.75x;
      height: 33px;
      padding: 7.5px;
      font-size: 12px;
      margin-right: 6px;
    }
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

    @media (max-width: 1440px) {
      width: 59.25px;
      height: 33px;
      font-size: 9px;
    }
  }
`;

const StEmailInputBtn = styled.div`
  width: 416px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 1440px) {
    width: 312px;
    margin-bottom: 6px;
  }
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

    @media (max-width: 1440px) {
      font-size: 9px;
    }
  }

  @media (max-width: 1440px) {
    width: 312px;
    height: 6.75px;
    margin-bottom: 11.25px;
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

    @media (max-width: 1440px) {
      height: 0.75px;
      font-size: 12px;
      /* margin-bottom: 12px; */
    }
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

    @media (max-width: 1440px) {
      width: 224.25px;
      height: 33px;
      padding: 7.5px;
      font-size: 12px;
      margin-right: 6px;
    }

    &::placeholder {
      color: #cccccc;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;

      @media (max-width: 1440px) {
        font-size: 10.5px;
      }
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

    @media (max-width: 1440px) {
      width: 81.75px;
      height: 33px;
      font-size: 9px;
      margin-bottom: 6px;
    }
  }

  @media (max-width: 1440px) {
    width: 327px;
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

  @media (max-width: 1440px) {
    font-size: 9px;
    width: 15px;
    height: 15px;
    transform: translate(195px, 11.25px);
  }
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

  @media (max-width: 1440px) {
    width: 312px;
    height: 33px;
    font-size: 9px;
    margin-bottom: 6px;
  }
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

    @media (max-width: 1440px) {
      font-size: 9px;
    }
  }

  @media (max-width: 1440px) {
    width: 312px;
    height: 6.75px;
    margin-bottom: 11.25px;
  }
`;

const StPwWrap = styled.div`
  width: 416px;
  height: 208px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1440px) {
    width: 312px;
    height: 156px;
  }
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

    @media (max-width: 1440px) {
      height: 9px;
      font-size: 12px;
      margin-bottom: 12px;
    }
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

    @media (max-width: 1440px) {
      width: 312px;
      height: 33px;
      padding: 7.5px;
      font-size: 12px;
      margin-right: 6px;
    }

    &::placeholder {
      color: #cccccc;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;
      letter-spacing: 0;

      @media (max-width: 1440px) {
        font-size: 10.5px;
      }
    }
  }

  @media (max-width: 1440px) {
    width: 312px;
    height: 78px;
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

    @media (max-width: 1440px) {
      height: 9px;
      font-size: 12px;
      margin-bottom: 12px;
    }
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

    @media (max-width: 1440px) {
      width: 312px;
      height: 33px;
      padding: 7.5px;
      font-size: 12px;
      margin-right: 6px;
    }
  }

  @media (max-width: 1440px) {
    width: 312px;
    height: 78px;
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

    @media (max-width: 1440px) {
      width: 312px;
      height: 33px;
      padding: 7.5px;
      font-size: 12px;
    }
  }

  img {
    width: 20px;
    height: 20px;
    transform: translate(385px, 12px);
    cursor: pointer;

    @media (max-width: 1440px) {
      width: 15px;
      height: 15px;
      transform: translate(288.75px, 9px);
    }
  }

  @media (max-width: 1440px) {
    margin-bottom: 19.5px;
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

  @media (max-width: 1440px) {
    width: 312px;
    height: 6.75px;
    margin: 6px 0px 11.25px 0px;
    font-size: 9px;
  }
`;

const StPwCheckWarning = styled.div`
  width: 416px;
  height: 9px;
  display: flex;
  align-items: center;
  color: #f65959;
  margin-top: 8px;
  font-size: 12px;

  @media (max-width: 1440px) {
    width: 312px;
    height: 6.75px;
    margin-top: 6px;
    font-size: 9px;
  }
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

    @media (max-width: 1440px) {
      height: 9px;
      font-size: 12px;
      margin-bottom: 12px;
    }
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

    @media (max-width: 1440px) {
      width: 312px;
      height: 33px;
      padding: 7.5px;
      font-size: 12px;
      margin-right: 6px;
    }

    &::placeholder {
      color: #cccccc;
      font-family: "Montserrat", sans-serif;
      font-size: 14px;

      @media (max-width: 1440px) {
        font-size: 10.5px;
      }
    }
  }

  @media (max-width: 1440px) {
    width: 312px;
    height: 66.75px;
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

  @media (max-width: 1440px) {
    width: 312px;
    height: 6.75px;
    margin-top: 6px;
    font-size: 9px;
  }
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

  @media (max-width: 1440px) {
    margin-top: 30px;
    width: 312px;
    height: 48.75px;
    font-size: 12px;
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

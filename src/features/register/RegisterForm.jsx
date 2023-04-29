import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/register/useRegister";
import { useEmailConfirm } from "../../hooks/register/useEmailConfirm";
import {
  // emailConfirmHandler,
  emailRegExp,
  pwRegExp,
  emailValidation,
  pwValidation,
  nicknameValidation,
  registerHandler,
  checkUserPassword,
} from "./registerValidate";
import styled from "styled-components";
import { useEmailAuthSend } from "../../hooks/register/useEmailAuthSend";
import { useEmailAuthConfirm } from "../../hooks/register/useEmailAuthComfirm";
import museoLogo from "../../assets/imgs/museoLogo/임시 로고.png";
import falseVisibleEyes from "../../assets/imgs/login/invisible_gray.png";
import trueVisibleEyes from "../../assets/imgs/login/eye_gray.png";

/**
 * 할일
 * 1) input 빈 값인경우 input outline 적용
 * 2) 비밀번호 보기/숨기기
 * 3) 메일확인 -> 확인완료 토글
 * 4) 메일인증 -> 인증번호 재발송 토글
 * 5) 인증코드 유효시간
 */
function RegisterForm() {
  //회원가입시 register에 보낼 정보
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const [emailMsg, setEmailMsg] = useState(""); //이메일 유효성검사
  const [registerEmailConfirm, setRegisterEmailConfirm] = useState(false); //이메일 중복검사
  const [code, setCode] = useState(""); //이메일 인증번호
  const [emailAuthMsg, setEmailAuthMsg] = useState(""); //이메일 인증코드 검사
  const [checkCodeStyle, setCheckCodeStyle] = useState(false); //인증코드 발송 후 스타일
  const [pwMsg, setPwMsg] = useState(""); //비밀번호 유효성검사
  const [checkPassword, setCheckPassword] = useState(""); //비밀번호 확인
  const [checkPwMsg, setCheckPwMsg] = useState(""); //비밀번호 확인 검사
  const [pwVisible, setPwVisible] = useState(false); //비밀번호 보임/숨김
  const [nicknameMsg, setNicknameMsg] = useState(""); //닉네임 유효성검사

  //react-query
  const { register } = useRegister();
  const { emailConfirm, warningMsg, emailConfirmMsg, checkEmailConfirm } =
    useEmailConfirm();
  const { emailAuthSend, emailAuthSendMsg } = useEmailAuthSend();
  const {
    emailAuthConfirm,
    emailAuthConfirmMsg,
    emailAuthConfirmWarning,
    checkEmailAuthConfirm,
  } = useEmailAuthConfirm();

  const changeInputHandler = e => {
    const { value, name } = e.target;
    setRegisterInfo(pre => {
      return { ...pre, [name]: value };
    });
  };

  const emailRegExp = /^[a-zA-Z0-9+\-\\_.]+@[a-zA-Z0-9\\-]+\.[a-zA-Z0-9\-.]+$/;
  const pwRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,15}$/;

  //비밀번호 확인
  const changeCheckPasswordHandler = e => {
    setCheckPassword(e.target.value);
  };

  //이메일 인증메일 발송
  const emailAuthSendHandler = () => {
    //중복확인 한 상태에서만 인증메일 발송 가능
    if (checkEmailConfirm === true) {
      emailAuthSend({ email: registerInfo.email });
      setCheckCodeStyle(true);
    } else {
      setEmailAuthMsg("이메일 중복 확인을 진행해주세요.");
    }
  };

  useEffect(() => {
    if (emailAuthSendMsg) {
      setEmailAuthMsg(emailAuthSendMsg);
    }
    if (emailAuthConfirmMsg) {
      setEmailAuthMsg(emailAuthConfirmMsg);
    }
    if (emailAuthConfirmWarning) {
      setEmailAuthMsg(emailAuthConfirmWarning);
    }
  }, [emailAuthSendMsg, emailAuthConfirmMsg, emailAuthConfirmWarning]);

  //이메일 인증번호 onChange
  const changeEmailAuthConfirmHandler = e => {
    setCode(e.target.value);
  };

  //이메일 인증번호 확인
  const emailAuthConfirmHandler = () => {
    emailAuthConfirm({ email: registerInfo.email, code: Number(code) });
  };

  //비밀번호 보임/숨김
  const visibleChangeHandler = () => {
    setPwVisible(visible => !visible); //toggle
  };

  //이메일 중복검사
  const emailConfirmHandler = e => {
    e.preventDefault();
    if (registerInfo.email === "") {
      setEmailMsg("이메일을 입력해주세요.");
    } else if (!emailRegExp.test(registerInfo.email)) {
      setEmailMsg("이메일 형식이 맞지 않습니다.");
    } else {
      setRegisterEmailConfirm(true);
      emailConfirm({ email: registerInfo.email });
    }
  };

  //이메일 유효성 - 마운트, 빈 값이 아닐경우, 정규식
  useEffect(() => {
    if (registerInfo.email === "") {
      setEmailMsg("");
    } else if (!emailRegExp.test(registerInfo.email)) {
      setEmailMsg("이메일 형식이 맞지 않습니다.");
    } else {
      setEmailMsg("");
    }
  }, [registerInfo.email]);

  //비밀번호 유효성 - 마운트, 빈 값이 아닐경우, 정규식
  useEffect(() => {
    if (registerInfo.password === "") {
      setPwMsg("");
    } else if (!pwRegExp.test(registerInfo.password)) {
      setPwMsg("알파벳, 숫자, 특수문자를 조합하여 6~15자로 입력해주세요.");
    } else {
      setPwMsg("");
    }
  }, [registerInfo.password]);

  //비밀번호 확인 - 마운트, 빈 값이 아닐경우, 정규식
  useEffect(() => {
    if (checkPassword === "") {
      setCheckPwMsg("");
    } else if (registerInfo.password !== checkPassword) {
      setCheckPwMsg("비밀번호와 일치하지 않습니다.");
    } else {
      setCheckPwMsg("");
    }
  }, [checkPassword]);

  //닉네임 확인 - 마운트, 빈 값이 아닐경우, 글자수
  useEffect(() => {
    if (registerInfo.nickname === "") {
      setNicknameMsg("");
    } else if (
      registerInfo.nickname.length < 2 ||
      registerInfo.nickname.length > 8
    ) {
      setNicknameMsg("2글자 이상 8글자 이하로 입력해주세요.");
    } else {
      setNicknameMsg("");
    }
  }, [registerInfo.nickname]);

  //회원가입 클릭
  const registerHandler = e => {
    e.preventDefault();
    if (
      checkEmailConfirm === true &&
      checkEmailAuthConfirm === true &&
      pwRegExp.test(registerInfo.password) &&
      registerInfo.password === checkPassword &&
      registerInfo.nickname.length >= 2 &&
      registerInfo.nickname.length <= 8
    ) {
      register(registerInfo);
    } else if (!registerInfo.email) {
      setEmailMsg("이메일을 입력해주세요.");
    } else if (checkEmailConfirm === false) {
      setEmailMsg("이메일 중복 확인을 진행해주세요.");
    } else if (checkEmailConfirm === true) {
      setEmailMsg(null);
    } else if (!pwRegExp.test(registerInfo.password)) {
      setPwMsg("알파벳, 숫자, 특수문자를 조합하여 6~15자로 입력해주세요.");
    } else if (registerInfo.password !== checkPassword) {
      setCheckPwMsg("비밀번호와 일치하지 않습니다.");
    } else if (
      registerInfo.nickname.length < 2 ||
      registerInfo.nickname.length > 8
    ) {
      setNicknameMsg("2글자 이상 8글자 이하로 입력해주세요.");
    }
  };

  return (
    <StRegister>
      <StRegisterWrap>
        <StLinkBox>
          <Link to="/">
            <img src={museoLogo} alt="museoLogo" />
          </Link>
        </StLinkBox>

        <StEmailWrap>
          <StEmailInputBox>
            <label>이메일</label>

            <StEmailInputBtn>
              <input
                type="email"
                name="email"
                onChange={changeInputHandler}
                style={{
                  borderColor: emailMsg || warningMsg ? "red" : "#dddddd",
                }}
              />
              <button
                onClick={emailConfirmHandler}
                style={{
                  backgroundColor:
                    registerEmailConfirm === false ? "white" : "#CCCCCC",
                  borderColor:
                    registerEmailConfirm === false ? "#3C3C3C" : "#CCCCCC",
                  color: registerEmailConfirm === false ? "#3C3C3C" : "#FFFFFF",
                }}
              >
                중복 확인
              </button>
            </StEmailInputBtn>

            <StEmailInputWarning>
              <div>{emailMsg || warningMsg || emailConfirmMsg}</div>
            </StEmailInputWarning>
          </StEmailInputBox>

          <StEmailValidationBox>
            <label>이메일 인증</label>
            {/* 추후 남은시간 보여줄 것 */}
            {/* <div>인증코드 유효시간은 3분입니다.</div> */}

            <StEmailAuthBox>
              <input
                type="text"
                value={code}
                onChange={changeEmailAuthConfirmHandler}
                placeholder="인증 코드 입력"
              />
              <button
                onClick={emailAuthSendHandler}
                style={{
                  backgroundColor:
                    checkCodeStyle === false ? "white" : "#CCCCCC",
                  borderColor: checkCodeStyle === false ? "#3C3C3C" : "#CCCCCC",
                  color: checkCodeStyle === false ? "#3C3C3C" : "#FFFFFF",
                }}
              >
                인증번호 발송
              </button>
            </StEmailAuthBox>
            <StEmailAuthBtn onClick={emailAuthConfirmHandler}>
              확인
            </StEmailAuthBtn>
            <StEmailAuthWarning>
              <div>{emailAuthMsg}</div>
            </StEmailAuthWarning>
          </StEmailValidationBox>
        </StEmailWrap>

        <StPwWrap>
          <StPwContainer>
            <label>비밀번호</label>
            {!pwVisible ? (
              <StPwInputImgWrap>
                <input
                  type="password"
                  name="password"
                  onChange={changeInputHandler}
                  placeholder="알파벳, 숫자, 특수문자 조합 6-15자"
                  style={{
                    fontFamily: "Malgun gothic",
                    color: "#242424",
                    padding: "10px 10px 15px",
                    letterSpacing: "3px",
                  }}
                />
                <div onClick={visibleChangeHandler}>
                  <img src={falseVisibleEyes} alt="invisibleEyes" />
                </div>
              </StPwInputImgWrap>
            ) : (
              <StPwInputImgWrap>
                <input
                  type="text"
                  name="password"
                  onChange={changeInputHandler}
                  placeholder="알파벳, 숫자, 특수문자 조합 6-15자"
                />
                <div onClick={visibleChangeHandler}>
                  <img src={trueVisibleEyes} alt="trueVisibleEyes" />
                </div>
              </StPwInputImgWrap>
            )}
            <StPwInputWarning>{pwMsg}</StPwInputWarning>
          </StPwContainer>

          <StPwConfirmContainer>
            <label>비밀번호 확인</label>
            <div>
              <input
                type="password"
                name="checkPassword"
                value={checkPassword}
                onChange={changeCheckPasswordHandler}
                style={{
                  fontFamily: "Malgun gothic",
                  color: "#242424",
                  padding: "10px 10px 15px",
                  letterSpacing: "3px",
                }}
              />
            </div>

            <StPwCheckWarning>{checkPwMsg}</StPwCheckWarning>
          </StPwConfirmContainer>
        </StPwWrap>

        <StNickNameBox>
          <label>닉네임</label>

          <div>
            <input
              type="text"
              name="nickname"
              onChange={changeInputHandler}
              placeholder="2글자 이상 8글자 이하 입력"
            />
            <StNickNameWarning>{nicknameMsg}</StNickNameWarning>
          </div>
        </StNickNameBox>

        <StRegisterBtn onClick={registerHandler}>가입하기</StRegisterBtn>
      </StRegisterWrap>
    </StRegister>
  );
}

export default RegisterForm;

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

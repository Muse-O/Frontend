import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/register/useRegister";
import { useEmailConfirm } from "../../hooks/register/useEmailConfirm";
import { useEmailAuthSend } from "../../hooks/register/useEmailAuthSend";
import { useEmailAuthConfirm } from "../../hooks/register/useEmailAuthComfirm";
import museoLogo from "../../assets/imgs/museoLogo/임시 로고.png";
import falseVisibleEyes from "../../assets/imgs/login/invisible_gray.png";
import trueVisibleEyes from "../../assets/imgs/login/eye_gray.png";
import * as Style from "../register/css/RegisterFormStyle";

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
      setShowTimer(true);
      setMinutes(3);
      setSeconds(0);
    } else {
      setEmailAuthMsg("이메일 중복 확인을 진행해주세요.");
    }
  };

  //타이머
  const [showTimer, setShowTimer] = useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (showTimer) {
      interval = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(interval);
            setShowTimer(false); // 타이머 종료 후 showTimer를 false로 변경
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showTimer, minutes, seconds]);

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
      setEmailMsg("");
    } else if (!pwRegExp.test(registerInfo.password)) {
      setPwMsg("알파벳, 숫자, 특수문자를 조합하여 6~15자로 입력해주세요.");
    } else if (registerInfo.password !== checkPassword) {
      setCheckPwMsg("비밀번호와 일치하지 않습니다.");
    } else if (registerInfo.nickname === "") {
      setNicknameMsg("닉네임을 입력해주세요.");
    } else if (
      registerInfo.nickname.length < 2 ||
      registerInfo.nickname.length > 8
    ) {
      setNicknameMsg("2글자 이상 8글자 이하로 입력해주세요.");
    }
  };

  return (
    <Style.StRegister>
      <Style.StRegisterWrap>
        <Style.StLinkBox>
          <Link to="/">
            <img src={museoLogo} alt="museoLogo" />
          </Link>
        </Style.StLinkBox>

        <Style.StEmailWrap>
          <Style.StEmailInputBox>
            <label>이메일</label>

            <Style.StEmailInputBtn>
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
            </Style.StEmailInputBtn>

            <Style.StEmailInputWarning>
              <div>{emailMsg || warningMsg || emailConfirmMsg}</div>
            </Style.StEmailInputWarning>
          </Style.StEmailInputBox>

          <Style.StEmailValidationBox>
            <label>이메일 인증</label>

            <Style.StEmailAuthBox>
              <input
                type="text"
                value={code}
                onChange={changeEmailAuthConfirmHandler}
                placeholder="인증 코드 입력"
              />

              {showTimer && (
                <Style.StCount>
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Style.StCount>
              )}
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
            </Style.StEmailAuthBox>
            <Style.StEmailAuthBtn onClick={emailAuthConfirmHandler}>
              확인
            </Style.StEmailAuthBtn>
            <Style.StEmailAuthWarning>
              <div>{emailAuthMsg}</div>
            </Style.StEmailAuthWarning>
          </Style.StEmailValidationBox>
        </Style.StEmailWrap>

        <Style.StPwWrap>
          <Style.StPwContainer>
            <label>비밀번호</label>
            {!pwVisible ? (
              <Style.StPwInputImgWrap>
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
                    borderColor: pwMsg ? "red" : "#dddddd",
                  }}
                />
                <div onClick={visibleChangeHandler}>
                  <img src={falseVisibleEyes} alt="invisibleEyes" />
                </div>
              </Style.StPwInputImgWrap>
            ) : (
              <Style.StPwInputImgWrap>
                <input
                  type="text"
                  name="password"
                  onChange={changeInputHandler}
                  placeholder="알파벳, 숫자, 특수문자 조합 6-15자"
                  style={{ borderColor: pwMsg ? "red" : "#dddddd" }}
                />
                <div onClick={visibleChangeHandler}>
                  <img src={trueVisibleEyes} alt="trueVisibleEyes" />
                </div>
              </Style.StPwInputImgWrap>
            )}
            <Style.StPwInputWarning>{pwMsg}</Style.StPwInputWarning>
          </Style.StPwContainer>

          <Style.StPwConfirmContainer>
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
                  borderColor: checkPwMsg ? "red" : "#dddddd",
                }}
              />
            </div>

            <Style.StPwCheckWarning>{checkPwMsg}</Style.StPwCheckWarning>
          </Style.StPwConfirmContainer>
        </Style.StPwWrap>

        <Style.StNickNameBox>
          <label>닉네임</label>

          <div>
            <input
              type="text"
              name="nickname"
              onChange={changeInputHandler}
              placeholder="2글자 이상 8글자 이하 입력"
              style={{ borderColor: nicknameMsg ? "red" : "#dddddd" }}
            />
            <Style.StNickNameWarning>{nicknameMsg}</Style.StNickNameWarning>
          </div>
        </Style.StNickNameBox>

        <Style.StRegisterBtn onClick={registerHandler}>
          가입하기
        </Style.StRegisterBtn>
      </Style.StRegisterWrap>
    </Style.StRegister>
  );
}

export default RegisterForm;

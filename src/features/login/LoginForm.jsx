import React, { useEffect, useState } from "react";
import useLogin from "../../hooks/login/useLogin";
import { Link } from "react-router-dom";
import naverLogo from "../../assets/imgs/login/네이버로고.png";
import googleLogo from "../../assets/imgs/login/google-plus.png";
import kakaoLogo from "../../assets/imgs/login/kakao-talk.png";
import museoLogo from "../../assets/imgs/museoLogo/임시 로고.png";
import falseVisibleEyes from "../../assets/imgs/login/invisible_gray.png";
import trueVisibleEyes from "../../assets/imgs/login/eye_gray.png";
import Swal from "sweetalert2";
import * as LoginStyle from "../login/LoginStyle";

function LoginForm() {
  //react-query
  const { login } = useLogin();

  const [emailMsg, setEmailMsg] = useState(""); //유효성 검사
  const [pwMsg, setPwMsg] = useState(""); //유효성 검사
  const [pwVisible, setPwVisible] = useState(false); //비밀번호

  //로그인시 login에 보낼 정보
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = e => {
    const { value, name } = e.target;
    setLoginInfo(pre => {
      return { ...pre, [name]: value };
    });
  };

  /*
로그인 유효성검사 1
-> 로그인 버튼 클릭시 이메일, 비밀번호 빈 값 체크
*/
  const loginHandler = e => {
    e.preventDefault();
    if (!loginInfo.email) {
      setEmailMsg("이메일을 입력해주세요.");
    } else if (!loginInfo.password) {
      setPwMsg("비밀번호를 입력해주세요.");
    } else {
      login(loginInfo);
    }
  };

  /*
로그인 유효성검사 2
-> 로그인페이지 마운트시 input이 빈 값이어서 자동으로 빈 값 검사되는 것 방지
-> 로그인버튼 클릭 후 input값 입력시 경고문구 사라지게 함
*/
  useEffect(() => {
    if (loginInfo.email === "") {
      setEmailMsg("");
    } else if (loginInfo.email) {
      setEmailMsg("");
    }
  }, [loginInfo.email]);

  useEffect(() => {
    if (loginInfo.password === "") {
      setPwMsg("");
    } else if (loginInfo.password) {
      setPwMsg("");
    }
  }, [loginInfo.password]);

  //비밀번호 보임/숨김
  const visibleChangeHandler = () => {
    setPwVisible(visible => !visible); //toggle
  };

  //소셜로그인 미구현 -> 서비스 제공 예정 alert
  const socialLoginBtn = () => {
    Swal.fire({
      title: "서비스 제공 예정입니다.",
      icon: "info",
      focusConfirm: false,
    });
  };

  return (
    <LoginStyle.StLogin>
      <LoginStyle.StLinkBox>
        <Link to="/">
          <img src={museoLogo} alt="museoLogo" />
        </Link>
      </LoginStyle.StLinkBox>

      <LoginStyle.StEmailInputBox>
        <label>이메일</label>
        <LoginStyle.StEmailInputWrap>
          <input
            type="email"
            name="email"
            onChange={changeInputHandler}
            style={{ borderColor: !emailMsg ? "#dddddd" : "red" }}
          />
          <div>{emailMsg}</div>
        </LoginStyle.StEmailInputWrap>
      </LoginStyle.StEmailInputBox>

      <LoginStyle.StPwInputBox>
        <label>비밀번호</label>
        <LoginStyle.StPwInputWrap>
          {!pwVisible ? (
            <LoginStyle.StPwInputImgWrap>
              <input
                type="password"
                name="password"
                onChange={changeInputHandler}
                style={{
                  borderColor: !pwMsg ? "#dddddd" : "red",
                  fontFamily: "Malgun gothic",
                  color: "#242424",
                  padding: "10px 10px 15px",
                  letterSpacing: "3px",
                }}
              />
              <div onClick={visibleChangeHandler}>
                <img src={falseVisibleEyes} alt="invisibleEyes" />
              </div>
            </LoginStyle.StPwInputImgWrap>
          ) : (
            <LoginStyle.StPwInputImgWrap>
              <input
                type="text"
                name="password"
                onChange={changeInputHandler}
                style={{
                  borderColor: !pwMsg ? "#dddddd" : "red",
                }}
              />
              <div onClick={visibleChangeHandler}>
                <img src={trueVisibleEyes} alt="trueVisibleEyes" />
              </div>
            </LoginStyle.StPwInputImgWrap>
          )}
        </LoginStyle.StPwInputWrap>
        <LoginStyle.StPwWarning>{pwMsg}</LoginStyle.StPwWarning>
      </LoginStyle.StPwInputBox>

      <LoginStyle.StLoginBtn onClick={loginHandler}>
        로그인
      </LoginStyle.StLoginBtn>

      <LoginStyle.StSnsBox>
        <div>SNS로 간편하게 시작하기</div>

        <LoginStyle.StSnsBtnWrap>
          <LoginStyle.GoogleLogoDiv onClick={socialLoginBtn}>
            <img
              src={googleLogo}
              alt="googleLogo"
              style={{ width: "30px", height: "30px" }}
            />
          </LoginStyle.GoogleLogoDiv>
          <div onClick={socialLoginBtn}>
            <img src={kakaoLogo} alt="kakaoLogo" />
          </div>
          <div onClick={socialLoginBtn}>
            <img src={naverLogo} alt="naverLogo" />
          </div>
        </LoginStyle.StSnsBtnWrap>
      </LoginStyle.StSnsBox>

      <LoginStyle.StRegisterLink>
        <div>아직 회원이 아니시라면</div>
        <LoginStyle.StLink to="/register">회원가입</LoginStyle.StLink>
      </LoginStyle.StRegisterLink>
    </LoginStyle.StLogin>
  );
}

export default LoginForm;

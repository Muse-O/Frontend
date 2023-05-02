import React, { useEffect, useState } from "react";
import useLogin from "../../hooks/login/useLogin";
import { Link, useNavigate } from "react-router-dom";
import falseVisibleEyes from "../../assets/imgs/login/invisible_gray.png";
import trueVisibleEyes from "../../assets/imgs/login/eye_gray.png";
import naverLogo from "../../assets/imgs/login/네이버로고.png";
import googleLogo from "../../assets/imgs/login/google-plus.png";
import kakaoLogo from "../../assets/imgs/login/kakao-talk.png";
import museoLogo from "../../assets/imgs/museoLogo/임시 로고.png";
import * as Style from "../login/css/LoginStyle";
import Swal from "sweetalert2";

function LoginForm() {
  const navigate = useNavigate();
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
  // const socialLoginBtn = () => {
  //   Swal.fire({
  //     title: "서비스 제공 예정입니다.",
  //     icon: "info",
  //     focusConfirm: false,
  //   });
  // };

  const BASE_URL = "https://museoh.shop";

  //구글
  const googleLoginBtn = () => {
    navigate(`${BASE_URL}/auth/google`);
  };

  //카카오톡
  const kakaoLoginBtn = () => {
    navigate(`${BASE_URL}/auth/kakao`);
  };

  //네이버
  const naverLoginBtn = () => {
    navigate(`${BASE_URL}/auth/naver`);
  };

  return (
    <Style.StLogin>
      <Style.StLinkBox>
        <Link to="/">
          <img src={museoLogo} alt="museoLogo" />
        </Link>
      </Style.StLinkBox>

      <Style.StEmailInputBox>
        <label>이메일</label>
        <Style.StEmailInputWrap>
          <input
            type="email"
            name="email"
            onChange={changeInputHandler}
            style={{ borderColor: !emailMsg ? "#dddddd" : "red" }}
          />
          <div>{emailMsg}</div>
        </Style.StEmailInputWrap>
      </Style.StEmailInputBox>

      <Style.StPwInputBox>
        <label>비밀번호</label>
        <Style.StPwInputWrap>
          {!pwVisible ? (
            <Style.StPwInputImgWrap>
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
            </Style.StPwInputImgWrap>
          ) : (
            <Style.StPwInputImgWrap>
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
            </Style.StPwInputImgWrap>
          )}
        </Style.StPwInputWrap>
        <Style.StPwWarning>{pwMsg}</Style.StPwWarning>
      </Style.StPwInputBox>

      <Style.StLoginBtn onClick={loginHandler}>로그인</Style.StLoginBtn>

      <Style.StSnsBox>
        <div>SNS로 간편하게 시작하기</div>

        <Style.StSnsBtnWrap>
          <Style.GoogleLogoDiv onClick={googleLoginBtn}>
            <img
              src={googleLogo}
              alt="googleLogo"
              style={{ width: "30px", height: "30px" }}
            />
          </Style.GoogleLogoDiv>
          <div onClick={kakaoLoginBtn}>
            <img src={kakaoLogo} alt="kakaoLogo" />
          </div>
          <div onClick={naverLoginBtn}>
            <img src={naverLogo} alt="naverLogo" />
          </div>
        </Style.StSnsBtnWrap>
      </Style.StSnsBox>

      <Style.StRegisterLink>
        <div>아직 회원이 아니시라면</div>
        <Style.StLink to="/register">회원가입</Style.StLink>
      </Style.StRegisterLink>
    </Style.StLogin>
  );
}

export default LoginForm;

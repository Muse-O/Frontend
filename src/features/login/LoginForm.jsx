import React, { useState } from "react";
import useLogin from "../../hooks/login/useLogin";
import { Link } from "react-router-dom";
import styled from "styled-components";
import naverLogo from "../../assets/imgs/login/네이버로고.png";
import googleLogo from "../../assets/imgs/login/google-plus.png";
import kakaoLogo from "../../assets/imgs/login/kakao-talk.png";
import museoLogo from "../../assets/imgs/museoLogo/임시 로고.png";

function LoginForm() {
  //react-query
  const { login } = useLogin();

  //유효성 검사
  const [emailMsg, setEmailMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");

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

  //로그인 버튼 클릭시 실행될 유효성검사
  //빈 값 검사, 이메일 틀렸을 때 메시지, 비밀번호 틀렸을 때 메시지
  const loginHandler = e => {
    e.preventDefault();
    if (loginInfo.email === "") {
      setEmailMsg("이메일을 입력해주세요.");
    } else if (loginInfo.password === "") {
      setPwMsg("비밀번호를 입력해주세요.");
    } else {
      login(loginInfo);
      setEmailMsg("");
      setPwMsg("");
    }
  };

  return (
    <StLogin>
      <StLinkBox>
        <Link to="/" style={{ fontSize: "15px" }}>
          <img src={museoLogo} alt="museoLogo" />
        </Link>
      </StLinkBox>

      <StEmailInputBox>
        <label>이메일</label>
        <StEmailInputWrap>
          <input
            type="email"
            name="email"
            required
            onChange={changeInputHandler}
          />
          <div>{emailMsg}</div>
        </StEmailInputWrap>
      </StEmailInputBox>

      <StPwInputBox>
        <label>비밀번호</label>
        <StPwInputWrap>
          <input
            type="password"
            name="password"
            required
            onChange={changeInputHandler}
          />
          <div>{pwMsg}</div>
        </StPwInputWrap>
      </StPwInputBox>

      <StLoginBtn onClick={loginHandler}>로그인</StLoginBtn>

      <StSnsBox>
        <div>SNS로 간편하게 시작하기</div>

        <StSnsBtnWrap>
          <GoogleLogoDiv>
            <img
              src={googleLogo}
              alt="googleLogo"
              style={{ width: "30px", height: "30px" }}
            />
          </GoogleLogoDiv>
          <div>
            <img src={kakaoLogo} alt="kakaoLogo" />
          </div>
          <div>
            <img src={naverLogo} alt="naverLogo" />
          </div>
        </StSnsBtnWrap>
      </StSnsBox>

      <StRegisterLink>
        <div>아직 회원이 아니시라면</div>
        <StLink to="/register">회원가입</StLink>
      </StRegisterLink>
    </StLogin>
  );
}

export default LoginForm;

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
    font-family: "SpoqaHanSansNeo-Regular";
    width: 416px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 15px;
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
  gap: 16px;

  label {
    color: #242424;
    font-size: 15px;
    font-weight: bold;
  }
`;

const StPwInputWrap = styled.div`
  width: 416px;
  height: 48px;

  input {
    width: 416px;
    height: 44px;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    outline: none;
    font-size: 15px;
    margin-bottom: 5px;
  }

  div {
    color: #f65959;
  }
`;

const StLoginBtn = styled.button`
  font-family: "SpoqaHanSansNeo-Regular";
  background-color: white;
  color: #171717;
  width: 416px;
  height: 65px;
  border: 1px solid gray;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  margin: 44px 0px 72px;
  cursor: pointer;
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

import React, { useState } from "react";
import { Flex } from "../../components/Flex";
import useLogin from "../../hooks/login/useLogin";
import { Link } from "react-router-dom";
import styled from "styled-components";

function LoginForm() {
  //react-query
  const { login } = useLogin();

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
    if (loginInfo.email === "") {
      alert("이메일을 입력해주세요.");
      e.preventDefault();
    } else if (loginInfo.password === "") {
      alert("비밀번호를 입력해주세요.");
      e.preventDefault();
    } else {
      e.preventDefault();
      login(loginInfo);
    }
  };

  return (
    <StLogin>
      <StLinkBox>
        <Link to="/" style={{ fontSize: "15px" }}>
          로고
        </Link>
      </StLinkBox>

      <StEmailInputBox>
        <label>이메일</label>
        <input type="email" name="email" onChange={changeInputHandler} />
      </StEmailInputBox>

      <StPwInputBox>
        <label>비밀번호</label>
        <input type="password" name="password" onChange={changeInputHandler} />
      </StPwInputBox>

      <StLoginBtn onClick={loginHandler}>등록하기</StLoginBtn>

      <StSnsBox>
        <div>SNS로 간편하게 시작하기</div>

        <StSnsBtnWrap>
          <div>{/* <img src='' alt=''/> */}</div>
          <div>{/* <img src='' alt=''/> */}</div>
          <div>{/* <img src='' alt=''/> */}</div>
        </StSnsBtnWrap>
      </StSnsBox>

      <StRegisterBtn to="/register">회원가입</StRegisterBtn>
    </StLogin>
  );
}

export default LoginForm;

const StLogin = styled.form`
  font-family: "SpoqaHanSansNeo-Regular";
  background-color: #80808029;
  width: 616px;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StLinkBox = styled.div`
  background-color: white;
  width: 333px;
  height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 43px;
`;

const StEmailInputBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 69px 0px 26px;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  input {
    font-family: "SpoqaHanSansNeo-Regular";
    height: 42px;
    padding: 10px;
    border: 1px solid gray;
    outline: none;
    font-size: 15px;
  }
`;

const StPwInputBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  input {
    height: 42px;
    padding: 10px;
    border: 1px solid gray;
    outline: none;
    font-size: 15px;
  }
`;

const StLoginBtn = styled.button`
  font-family: "SpoqaHanSansNeo-Regular";
  background-color: gray;
  width: 416px;
  height: 65px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: bold;
  margin: 32px 0px 75px;
  cursor: pointer;
`;

const StSnsBox = styled.div`
  width: 195px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 23px;
  div {
    font-size: 15px;
    font-weight: bold;
  }
`;

const StSnsBtnWrap = styled.div`
  display: flex;
  gap: 24px;

  div {
    background-color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const StRegisterBtn = styled(Link)`
  background-color: gray;
  text-decoration: none;
  font-weight: bold;
  color: white;
  width: 195px;
  height: 40px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  margin-top: 50px;
`;

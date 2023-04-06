import React, { useState } from "react";
import { Flex } from "../../components/Flex";
import useLogin from "../../hooks/register,login/useLogin";
import { Link } from "react-router-dom";

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
    <Flex as="form" fd="column" gap="10">
      <Link to="/">로고 자리(메인으로 돌아감)</Link>
      <label>이메일</label>
      <input type="email" name="email" onChange={changeInputHandler} />

      <label>비밀번호</label>
      <input type="password" name="password" onChange={changeInputHandler} />

      <button onClick={loginHandler}>로그인</button>
    </Flex>
  );
}

export default LoginForm;

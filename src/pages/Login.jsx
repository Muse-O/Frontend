import React, { useEffect } from "react";
import LoginForm from "../features/login/LoginForm";
import styled from "styled-components";
import { MainWrap } from "../shared/GlobalStyled";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerStatedefalut } from "../components/headerStore";
import { headerStateSearch } from "../components/headerStore";

function Login() {
  const [, setHeaderState] = useRecoilState(headerStatedefalut)
  const headerState = useRecoilValue(headerStateSearch)
  useEffect(()=> {
    setHeaderState({...headerState})
  },[])
  return (
    <StMainWrap>
      <LoginForm />
    </StMainWrap>
  );
}

export default Login;

const StMainWrap = styled(MainWrap)`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import React from "react";
import LoginForm from "../features/login/LoginForm";
import styled from "styled-components";

function Login() {
  return (
    <StLoginContainer>
      <LoginForm />
    </StLoginContainer>
  );
}

export default Login;

const StLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 118px;
`;

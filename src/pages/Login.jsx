import React from "react";
import LoginForm from "../features/login/LoginForm";
import styled from "styled-components";
import { MainWrap } from "../shared/GlobalStyled";
import { ToastContainer } from "react-toastify"; //react-toastify
import "react-toastify/dist/ReactToastify.css"; //react-toastify

function Login() {
  return (
    <StMainWrap>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={true}
        autoClose={2000}
        hideProgressBar={true}
        theme="light"
      />
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

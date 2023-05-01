import React from "react";
import RegisterForm from "./../features/register/RegisterForm";
import styled from "styled-components";
import { MainWrap } from "../shared/GlobalStyled";
import { ToastContainer, toast } from "react-toastify"; //react-toastify
import "react-toastify/dist/ReactToastify.css"; //react-toastify

function Register() {
  return (
    <StMainWrap>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={true}
        autoClose={4000}
        hideProgressBar={true}
        theme="light"
      />
      <RegisterForm />
    </StMainWrap>
  );
}

export default Register;

const StMainWrap = styled(MainWrap)`
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

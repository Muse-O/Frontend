import React from "react";
import RegisterForm from "./../features/register/RegisterForm";
import styled from "styled-components";

function Register() {
  return (
    <StRegisterContainer>
      <RegisterForm />
    </StRegisterContainer>
  );
}

export default Register;

const StRegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

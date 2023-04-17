import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/register/useRegister";
import { useEmailConfirm } from "../../hooks/register/useEmailConfirm";
import {
  emailConfirmHandler,
  emailRegExp,
  pwRegExp,
  emailValidation,
  pwValidation,
  nicknameValidation,
  registerHandler,
  checkUserPassword,
} from "./registerValidate";
import styled from "styled-components";
import { useEmailAuthSend } from "../../hooks/register/useEmailAuthSend";
import { useEmailAuthConfirm } from "../../hooks/register/useEmailAuthComfirm";

function RegisterForm() {
  //회원가입시 register에 보낼 정보
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  //이메일 인증번호
  const [code, setCode] = useState("");

  //비밀번호 확인
  const [checkPassword, setCheckPassword] = useState("");

  //react-query
  const { register } = useRegister();
  const { emailConfirm, checkEmailConfirm } = useEmailConfirm();
  const { emailAuthSend } = useEmailAuthSend();
  const { emailAuthConfirm } = useEmailAuthConfirm();

  const changeInputHandler = e => {
    const { value, name } = e.target;
    setRegisterInfo(pre => {
      return { ...pre, [name]: value };
    });
  };

  //비밀번호 확인
  const changeCheckPasswordHandler = e => {
    setCheckPassword(e.target.value);
  };

  //이메일 인증메일 발송
  const emailAuthSendHandler = () => {
    emailAuthSend({ email: registerInfo.email });
  };

  //이메일 인증번호 onChange
  const changeEmailAuthConfirmHandler = e => {
    setCode(e.target.value);
  };

  //이메일 인증번호 확인
  const emailAuthConfirmHandler = () => {
    emailAuthConfirm({ email: registerInfo.email, code: Number(code) });
  };

  return (
    <StRegister>
      <StLinkBox>
        <Link to="/">로고</Link>
      </StLinkBox>
      <StEmailWrap>
        <StEmailInputBox>
          <StEmailLabel>
            <label>이메일</label>
            <div>{emailValidation(registerInfo.email)}</div>
          </StEmailLabel>

          <div>
            <input type="email" name="email" onChange={changeInputHandler} />
            <button
              onClick={e => emailConfirmHandler(e, registerInfo, emailConfirm)}
            >
              중복확인
            </button>
          </div>
        </StEmailInputBox>

        <StEmailValidationBox>
          <StEmailAuthWrap>
            <StEmailAuthLabel>
              <label>메일인증</label>
              {/* 추후 남은시간 보여줄 것 */}
              {/* <div>인증코드 유효시간은 3분입니다.</div> */}
            </StEmailAuthLabel>
          </StEmailAuthWrap>

          <StEmailAuthBox>
            <button onClick={emailAuthSendHandler}>인증발송</button>
            <input
              type="text"
              value={code}
              onChange={changeEmailAuthConfirmHandler}
            />
            {/* 메인인증 클릭 후 인증메일 발송되면 인증확인 버튼 보이게 변경할것 */}
            <button onClick={emailAuthConfirmHandler}>인증확인</button>
          </StEmailAuthBox>
        </StEmailValidationBox>
      </StEmailWrap>

      <StPwBox>
        <StPwLabel>
          <label>비밀번호</label>
          <div>{pwValidation(registerInfo.password)}</div>
        </StPwLabel>
        <input type="password" name="password" onChange={changeInputHandler} />

        <StPwConformLabel>
          <label>비밀번호 확인</label>
          <div>{checkUserPassword(checkPassword, registerInfo.password)}</div>
        </StPwConformLabel>
        <input
          type="password"
          name="checkPassword"
          value={checkPassword}
          onChange={changeCheckPasswordHandler}
        />
      </StPwBox>

      <StNickNameBox>
        <StNickNameLabel>
          <label>닉네임</label>
          <div>{nicknameValidation(registerInfo.nickname)}</div>
        </StNickNameLabel>

        <input type="text" name="nickname" onChange={changeInputHandler} />
      </StNickNameBox>

      <StRegisterBtn
        onClick={e =>
          registerHandler(e, registerInfo, checkEmailConfirm, register)
        }
      >
        회원가입
      </StRegisterBtn>
    </StRegister>
  );
}

export default RegisterForm;

const StRegister = styled.div`
  background-color: #80808029;
  width: 616px;
  height: 840px;
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

const StEmailWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StEmailInputBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin: 69px 0px 0px 0px;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  input {
    width: 310px;
    height: 42px;
    padding: 10px;
    border: 1px solid gray;
    outline: none;
    font-size: 15px;
    margin-right: 5px;
  }

  button {
    /* background: linear-gradient(#0038ff, #c984ff); */
    background-color: gray;
    width: 100px;
    height: 42px;
    border-radius: 10px;
    color: white;
    font-size: 15px;
  }
`;

const StEmailLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  div {
    color: #d90404;
  }
`;

const StEmailValidationBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StEmailAuthWrap = styled.div`
  display: flex;
  flex-direction: column;

  button {
    /* background: linear-gradient(#0038ff, #c984ff); */
    background-color: gray;
    width: 100px;
    height: 42px;
    border-radius: 10px;
    color: white;
    font-size: 15px;
  }
`;

const StEmailAuthLabel = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  div {
    color: #d90404;
  }
`;

const StEmailAuthBox = styled.div`
  display: flex;
  gap: 7px;

  input {
    width: 200px;
    height: 42px;
    padding: 10px;
    border: 1px solid gray;
    outline: none;
    font-size: 15px;
  }

  button {
    background-color: gray;
    width: 100px;
    height: 42px;
    border-radius: 10px;
    color: white;
    font-size: 15px;
  }
`;

const StPwBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;

  input {
    width: 416px;
    height: 42px;
    padding: 10px;
    border: 1px solid gray;
    outline: none;
    font-size: 15px;
    margin-right: 5px;
  }
`;

const StPwLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  div {
    color: #d90404;
  }
`;

const StPwConformLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  div {
    color: #d90404;
  }
`;

const StNickNameBox = styled.div`
  width: 416px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;

  input {
    width: 416px;
    height: 42px;
    padding: 10px;
    border: 1px solid gray;
    outline: none;
    font-size: 15px;
    margin-right: 5px;
  }
`;

const StNickNameLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  div {
    color: #d90404;
  }
`;

const StRegisterBtn = styled.div`
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
  margin-top: 100px;
`;

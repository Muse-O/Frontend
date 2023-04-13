import React, { useState } from "react";
import { Flex } from "../../components/Flex";
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
} from "./registerValidate";
import styled from "styled-components";
import { useEmailAuthSend } from "../../hooks/register/useEmailAuthSend";
import { useEmailAuthConfirm } from "../../hooks/register/useEmailAuthComfirm";

function RegisterForm() {
  const [code, setCode] = useState("");
  //react-query
  const { register } = useRegister();
  const { emailConfirm, checkEmailConfirm } = useEmailConfirm();
  const { emailAuthSend } = useEmailAuthSend();
  const { emailAuthConfirm } = useEmailAuthConfirm();

  //회원가입시 register에 보낼 정보
  const [registerInfo, setRegisterInfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const changeInputHandler = e => {
    const { value, name } = e.target;
    setRegisterInfo(pre => {
      return { ...pre, [name]: value };
    });
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
    <StFlex fd="column" gap="20">
      <Link to="/">로고 자리(메인으로 돌아감)</Link>
      <StEmailWrap>
        <div>
          <label>이메일</label>
          <input type="email" name="email" onChange={changeInputHandler} />
          <button
            onClick={e => emailConfirmHandler(e, registerInfo, emailConfirm)}
          >
            중복확인
          </button>
        </div>

        <div>{emailValidation(registerInfo.email)}</div>

        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={emailAuthSendHandler}>메일인증</button>
            {/* 추후 남은시간 보여줄 것 */}
            <div>인증코드 유효시간은 3분입니다.</div>
          </div>

          <div>
            <input
              type="text"
              value={code}
              onChange={changeEmailAuthConfirmHandler}
            />
            <button onClick={emailAuthConfirmHandler}>인증확인</button>
          </div>
        </div>
      </StEmailWrap>

      <div>
        <label>비밀번호</label>
        <input type="password" name="password" onChange={changeInputHandler} />
        <div>{pwValidation(registerInfo.password)}</div>
      </div>

      <div>
        <label>닉네임</label>
        <input type="text" name="nickname" onChange={changeInputHandler} />
        <div>{nicknameValidation(registerInfo.nickname)}</div>
      </div>

      <button
        onClick={e =>
          registerHandler(e, registerInfo, checkEmailConfirm, register)
        }
      >
        회원가입
      </button>
    </StFlex>
  );
}

export default RegisterForm;

const StFlex = styled(Flex)`
  input {
    border: 1px solid gray;
  }
`;

const StEmailWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

//기존 코드------------------------------------------------------------------
// import React, { useState } from "react";
// import { Flex } from "../../components/Flex";
// import { Link } from "react-router-dom";
// import { useRegister } from "../../hooks/register/useRegister";
// import { useEmailConfirm } from "../../hooks/register/useEmailConfirm";

// function RegisterForm() {
//   //react-query
//   const { register } = useRegister();
//   const { emailConfirm, checkEmailConfirm } = useEmailConfirm();

//   //회원가입시 register에 보낼 정보
//   const [registerInfo, setRegisterInfo] = useState({
//     email: "",
//     password: "",
//     nickname: "",
//   });

//   const changeInputHandler = e => {
//     const { value, name } = e.target;
//     setRegisterInfo(pre => {
//       return { ...pre, [name]: value };
//     });
//   };

//   //회원가입 버튼 클릭시 useRegister에 payload(registerInfo) 전달
//   const registerHandler = e => {
//     //빈 값이 아닐때 register에 payload 보내기
//     if (registerInfo.email === "") {
//       alert("이메일을 입력해주세요.");
//       e.preventDefault();
//     } else if (registerInfo.password === "") {
//       alert("비밀번호를 입력해주세요.");
//       e.preventDefault();
//     } else if (registerInfo.nickname === "") {
//       alert("닉네임을 입력해주세요.");
//       e.preventDefault();
//     } else if (registerInfo.nickname.length < 2) {
//       e.preventDefault();
//       alert("닉네임을 2글자 이상 입력해주세요.");
//       //이메일 중복체크 확인 후 register에 payload 보내기
//     } else if (checkEmailConfirm === false) {
//       e.preventDefault();
//       alert("이메일 중복확인을 진행해주세요.");
//     } else if (checkEmailConfirm === true) {
//       e.preventDefault();
//       register(registerInfo);
//     }
//   };

//   //이메일 중복검사
//   const checkEmail = {
//     email: registerInfo.email,
//   };

//   const emailConfirmHandler = e => {
//     //빈값이 아닐때 보낼 수 있게 하기
//     if (registerInfo.email === "") {
//       alert("이메일을 입력해주세요.");
//       e.preventDefault();
//     } else if (!emailRegExp.test(registerInfo.email)) {
//       e.preventDefault();
//       return <div>이메일 형식이 올바르지 않습니다.</div>;
//     } else {
//       e.preventDefault();
//       emailConfirm(checkEmail);
//     }
//   };

//   //이메일, 비밀번호 형식 정규식 -> 확인해볼것
//   const emailRegExp = /^[a-zA-Z0-9+\-\\_.]+@[a-zA-Z0-9\\-]+\.[a-zA-Z0-9\-.]+$/;
//   const pwRegExp =
//     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,15}$/;

//   //이메일 입력값에 따른 검사값 출력
//   const emailValidation = () => {
//     if (registerInfo.email === "") {
//       return "";
//     } else if (!emailRegExp.test(registerInfo.email)) {
//       return "이메일 형식이 올바르지 않습니다.";
//     } else {
//       return "";
//     }
//   };

//   //비밀번호 입력값에 따른 검사값 출력
//   const pwValidation = () => {
//     if (registerInfo.password === "") {
//       return "";
//     } else if (!pwRegExp.test(registerInfo.password)) {
//       return "알파벳, 숫자, 특수문자 조합 6~15글자로 입력해주세요.";
//     } else {
//       return "";
//     }
//   };

//   //닉네임 빈 값 확인에 따른 검사값 출력
//   const nicknameValidation = () => {
//     if (registerInfo.nickname === "") {
//       return "";
//     } else if (registerInfo.nickname.length < 2) {
//       return "2글자 이상 입력해주세요.";
//     } else {
//       return "";
//     }
//   };

//   return (
//     <Flex as="form" fd="column" gap="10">
//       <Link to="/">로고 자리(메인으로 돌아감)</Link>
//       <label>이메일</label>
//       <input type="email" name="email" onChange={changeInputHandler} />
//       <button onClick={emailConfirmHandler}>중복확인</button>
//       <div>{emailValidation()}</div>

//       <label>비밀번호</label>
//       <input type="password" name="password" onChange={changeInputHandler} />
//       <div>{pwValidation()}</div>

//       <label>닉네임</label>
//       <input type="text" name="nickname" onChange={changeInputHandler} />
//       <div>{nicknameValidation()}</div>

//       <button onClick={registerHandler}>회원가입</button>
//     </Flex>
//   );
// }

// export default RegisterForm;

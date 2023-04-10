//이메일 중복검사
export const emailConfirmHandler = (e, registerInfo, emailConfirm) => {
  e.preventDefault();
  //빈값이 아닐때 보낼 수 있게 하기
  if (registerInfo.email === "") {
    alert("이메일을 입력해주세요.");
  } else if (!emailRegExp.test(registerInfo.email)) {
    // return <div>이메일 형식이 올바르지 않습니다.</div>; //여기 수정
    // alert("이메일 형식이 올바르지 않습니다.");
    return false;
  } else {
    emailConfirm({ email: registerInfo.email });
  }
};

export const emailRegExp =
  /^[a-zA-Z0-9+\-\\_.]+@[a-zA-Z0-9\\-]+\.[a-zA-Z0-9\-.]+$/;

export const pwRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,15}$/;

// 이메일 형식 검사
export const emailValidation = email => {
  if (email === "") {
    return "";
  } else if (!emailRegExp.test(email)) {
    return "이메일 형식이 올바르지 않습니다.";
  } else {
    return "";
  }
};

// 비밀번호 형식 검사
export const pwValidation = password => {
  if (password === "") {
    return "";
  } else if (!pwRegExp.test(password)) {
    return "알파벳, 숫자, 특수문자 조합 6~15글자로 입력해주세요.";
  } else {
    return "";
  }
};

// 닉네임 형식 검사
export const nicknameValidation = nickname => {
  if (nickname === "") {
    return "";
  } else if (nickname.length < 2) {
    return "2글자 이상 입력해주세요.";
  } else {
    return "";
  }
};

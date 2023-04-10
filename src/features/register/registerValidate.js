export const emailRegExp =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

export const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

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

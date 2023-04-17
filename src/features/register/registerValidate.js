//유효성 검사 함수 파일
/*
=> 중복되거나 필요없거나 추가되어야 할 내용 생각해보기

1) 중복되는 내용
이메일 중복검사 & 이메일 형식 검사 - 중복되는 내용 없는지?
=> 애초에 빈 값이거나 형식에 안 맞으면 중복검사도 안 되게 해야 하는게....
그럼 이메일 중복검사 로직을 이메일 형식 검사 안에 넣으면?
빈 값도 아니고, 형식도 맞으면 그 때 중복검사 함수를 실행하게 하면 되지 않을까.
=> 잘 안 됨 ㅠ

2) 회원가입 버튼 클릭시 빈 값 검사를 또 하는데 이건 유효성검사 로직에 추가하는게?

3) 추가해야할 내용?
*/

//이메일, 비밀번호 정규식
export const emailRegExp =
  /^[a-zA-Z0-9+\-\\_.]+@[a-zA-Z0-9\\-]+\.[a-zA-Z0-9\-.]+$/;
export const pwRegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,15}$/;

//이메일 중복검사
export const emailConfirmHandler = (e, registerInfo, emailConfirm) => {
  e.preventDefault();
  //빈값이 아닐때 보낼 수 있게 하기
  if (registerInfo.email === "") {
    alert("이메일을 입력해주세요.");
  } else if (!emailRegExp.test(registerInfo.email)) {
    return false;
  } else {
    emailConfirm({ email: registerInfo.email });
  }
};

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

//비밀번호 확인
export const checkUserPassword = (checkPassword, password) => {
  if (checkPassword === "") {
    return "";
  } else if (checkPassword !== password) {
    return "비밀번호가 일치하지 않습니다.";
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

//회원가입 버튼 클릭시 useRegister에 payload(registerInfo) 전달
export const registerHandler = (
  e,
  registerInfo,
  checkEmailConfirm,
  register
) => {
  e.preventDefault();

  //빈 값이 아닐때 register에 payload 보내기
  if (registerInfo.email === "") {
    alert("이메일을 입력해주세요.");
  } else if (registerInfo.password === "") {
    alert("비밀번호를 입력해주세요.");
  } else if (registerInfo.nickname === "") {
    alert("닉네임을 입력해주세요.");
  } else if (registerInfo.nickname.length < 2) {
    alert("닉네임을 2글자 이상 입력해주세요.");
    //이메일 중복체크 확인 후 register에 payload 보내기
  } else if (checkEmailConfirm === false) {
    alert("이메일 중복확인을 진행해주세요.");
  } else if (checkEmailConfirm === true) {
    register(registerInfo);
  }
};

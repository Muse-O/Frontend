import React from "react";
import Cookies from "universal-cookie";

function Logout({ setIsLoggedIn }) {
  const logoutHandler = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      const cookies = new Cookies();
      setIsLoggedIn(false);
      cookies.remove("access_token");
      alert("로그아웃 되었습니다.");
    }
  };

  return <button onClick={logoutHandler}>로그아웃</button>;
}

export default Logout;

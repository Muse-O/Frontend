import React from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { NavBottomPath } from "../../shared/GlobalStyled";

function Logout({ setIsLoggedIn, isLoggedIn }) {
  const navigate = useNavigate();
  const logoutHandler = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      const cookies = new Cookies();
      cookies.remove("access_token");
      setIsLoggedIn(false);

      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return <>{isLoggedIn && <NavBottomPath
    onClick={logoutHandler}>로그아웃</NavBottomPath>}</>;
}

export default Logout;

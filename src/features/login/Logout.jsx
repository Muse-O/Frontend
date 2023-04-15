import React from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

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

  return <>{isLoggedIn && <div
    style={{
      width:"200px",
      height: "40px",
      backgroundColor: "#D9D9D9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
    onClick={logoutHandler}>로그아웃</div>}</>;
}

export default Logout;

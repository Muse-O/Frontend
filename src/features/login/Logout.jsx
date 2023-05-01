import React from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { NavBottomPathLogin } from "../../shared/GlobalStyled";
import { useRecoilState, useRecoilValue } from "recoil";
import { decodeAccessToken } from "./loginTokenStore";
import {
  headerStateSearch,
  headerStatedefalut,
} from "../../components/headerStore";
//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Logout({ setIsLoggedIn, isLoggedIn }) {
  const [, setDecodeAccessToken] = useRecoilState(decodeAccessToken);
  const headerStateSearchs = useRecoilValue(headerStateSearch);
  const [, setHeaderState] = useRecoilState(headerStatedefalut);
  const navigate = useNavigate();
  const logoutHandler = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      const cookies = new Cookies();
      cookies.remove("access_token");
      setDecodeAccessToken({});
      setIsLoggedIn(false);
      setHeaderState({ ...headerStateSearchs });
      toast.success("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return (
    <>
      <ToastContainer
        position="top"
        limit={1}
        closeButton={true}
        autoClose={5000}
        hideProgressBar={true}
        theme="light"
      />
      {isLoggedIn && (
        <NavBottomPathLogin onClick={logoutHandler} children="로그아웃" />
      )}
    </>
  );
}

export default Logout;

import React, { useState } from "react";
import styled from "styled-components";
import { Flex } from "./Flex";
import { useNavigate } from "react-router-dom";
import Logout from "../features/login/Logout";
import { cookies } from "../shared/cookies";
import jwtDecode from "jwt-decode";

function Header() {
  const accessToken = cookies.get("access_token");
  let nickname = "로그인 해주세요.";
  if (accessToken) {
    const { email } = jwtDecode(accessToken);
    nickname = email;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(accessToken); //로그인/로그아웃 상태관리
  const navigate = useNavigate();

  const navList = [
    { title: "홈", navigation: "/" },
    { title: "전시", navigation: "/exhibition" },
    { title: "아트그램", navigation: "/artgram" },
    { title: "마이페이지", navigation: isLoggedIn ? "/mypage" : "/login" },
  ];

  return (
    <Headerwrap>
        <div
          className="logo"
          style={{
            height: "40px",
            backgroundColor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
          }}
        >
          <p>로고</p>
        </div>
        <div
          className="loginState"
          style={{
            height: "95px",
            borderBottom: "1px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            className="profileimg"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50px",
              backgroundColor: "#D9D9D9",
            }}
          />
          <p style={{ color: "#EBEBEB" }}> {nickname}</p>
        </div>
        <div className="headerNav" style={{ marginTop: "22px" }}>
          <div
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <input
              style={{
                width: "100%",
                height: "40px",
                backgroundColor: "#D9D9D9",
                padding: "12px",
                borderRadius: "5px",
              }}
              placeholder="검색"
            />
          </div>
          {navList.map(({ title, navigation }) => (
            <div
              key={title}
              className="headerNavItem"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "23px",
              }}
              onClick={() => navigate(`${navigation}`)}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50px",
                  backgroundColor: "#D9D9D9",
                }}
              />
              <p
                style={{
                  marginLeft: "12px",
                  fontSize: "24px",
                  color: "#FFFFFF",
                }}
              >
                {title}
              </p>
            </div>
          ))}
        </div>
        <br/>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/artgram");
          }}
        >
          아트그램
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/artgram/origin");
          }}
        >
          아트그램원본
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/artgram/create");
          }}
        >
          아트그램만들기
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/exhibition/create");
          }}
        >
          전시회 작성페이지
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/exhibition/update");
          }}
        >
          전시회 상세페이지
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/exhibition");
          }}
        >
          전시회 페이지
        </button>

        {/* 로그인 상태: 마이페이지 접근 가능 / 비로그인 상태: 로그인 페이지로 이동 */}
        <br/>
        <button
          onClick={() => {
            if (isLoggedIn) {
              navigate("/mypage");
            } else if (!isLoggedIn) {
              navigate("/login");
            }
          }}
        >
          마이 페이지
        </button>
        <br/>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          회원가입 페이지
        </button>

        {/* <FootingArea>푸터 컨탠츠</FootingArea> */}
      <div className="loginStage" style={{position:"absolute", bottom:"84px", display:"flex", flexDirection:"column", gap:"22px"}}>
        {!isLoggedIn
        ? (<>
        <div
          className="logo"
          style={{
            width:"200px",
            height: "40px",
            backgroundColor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
          }}
          onClick={() => {
            navigate("/register");
          }}
        >
          <p>회원가입</p>
        </div>
        <div
          className="logo"
          style={{
            width:"200px",
            height: "40px",
            backgroundColor: "#D9D9D9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          <p>로그인</p>
        </div>
        </>)
        : (<Logout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />)}
      </div>
    </Headerwrap>
  );
}

export default Header;

const Headerwrap = styled.header`
  font-family: "S-CoreDream-3Light";
  position: fixed;
  top: 0;
  bottom: 0;
  width: 245px;
  z-index: 10100;
  padding: 18px 23px;
  /* border: 5px solid red; */
  background-color: #252525;
`;

const FootingArea = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  color: white;
`;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../features/login/Logout";
import { cookies } from "../shared/cookies";
import jwtDecode from "jwt-decode";
import * as Headers from "../shared/GlobalStyled";
import MobileHeaer from "./MobileHeaer";
import { useRecoilState } from "recoil";
import { searchWordState } from "../hooks/search/seartStore";

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

  const [,setSearchWord] = useRecoilState(searchWordState)
  const [inputValue, setInputValue] = useState("")
  const searchhanler = (e) => {
    e.preventDefault()
    if(inputValue==="") {
      return
    } else {
      setSearchWord(inputValue.replace(/\s/g, ""))
      navigate('/search')
      setInputValue("")
    }
  }

  return (
    <Headers.Headerwrap>
        <MobileHeaer/>
        <Headers.Logo>
          <p>로고자리</p>
        </Headers.Logo>
        <Headers.LoginState>
          <Headers.LoginStateImg/>
          <Headers.LoginStateNickname children={nickname}/>
        </Headers.LoginState>
        <Headers.Nav>
          <Headers.NavSearch as="form" onSubmit={searchhanler}>
          <Headers.NavSearchInput 
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            placeholder="검색"/>
          </Headers.NavSearch>
          {navList.map(({ title, navigation }) => (
            <Headers.NavIcons
              key={title}
              onClick={() => navigate(`${navigation}`)}>
              <Headers.Navgate/>
              <Headers.NavgatePath children={title}/>
            </Headers.NavIcons>
          ))}
        </Headers.Nav>
        {/* <br/>
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

      // 로그인 상태: 마이페이지 접근 가능 / 비로그인 상태: 로그인 페이지로 이동 
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
        </button> */}



      <Headers.NavBottom>
        {!isLoggedIn
        ? (<>
        <Headers.NavBottomPath
          onClick={() => {
            navigate("/register");
          }}>
          <p>회원가입</p>
        </Headers.NavBottomPath>
        <Headers.NavBottomPath
          onClick={() => {
            navigate("/login");
          }}
        >
          <p>로그인</p>
        </Headers.NavBottomPath>
        </>)
        : (<Logout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />)}
      </Headers.NavBottom>
      
    </Headers.Headerwrap>
  );
}

export default Header;

// const Headerwrap = styled.header`
//   font-family: "S-CoreDream-3Light";
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   width: 245px;
//   z-index: 10100;
//   padding: 18px 23px;
//   /* border: 5px solid red; */
//   background-color: #252525;
  
//   @media (max-width: 1440px) {
//     width: 183.75px;
//   }
// `;
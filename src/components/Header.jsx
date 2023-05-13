import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../features/login/Logout";
import { cookies } from "../shared/cookies";
import jwtDecode from "jwt-decode";
import * as Headers from "../shared/GlobalStyled";
import MobileHeaer from "./MobileHeaer";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchWordState } from "../hooks/search/seartStore";
import { headerStateSearch, headerStatedefalut } from "./headerStore";

// Header 아이콘 ----------------------------------------------------------------------------------------/
import logo from "../assets/imgs/museoLogo/logo.png";
import home_gradient from "../assets/imgs/header/home_gradient.png";
import home_gray from "../assets/imgs/header/home_gray.png";
import exhibition_gradient from "../assets/imgs/header/exhibition_gradient.png";
import exhibition_gray from "../assets/imgs/header/exhibition_gray.png";
import artgram_gradient from "../assets/imgs/header/artgram_gradient.png";
import artgram_gray from "../assets/imgs/header/artgram_gray.png";
import user_gradient from "../assets/imgs/header/user_gradient.png";
import user_gray from "../assets/imgs/header/user_gray.png";
import chat_gradient from "../assets/imgs/header/chat_gradient.png";
import chat_gray from "../assets/imgs/header/chat_gray.png";
import profileimage1 from "../assets/imgs/login/profileimage1.png";
import OpenSearchWindow from "../features/unfiedSearch/OpenSearchWindow";
import palette_gradient from "../assets/imgs/mypage/palette_gradient.png";
import gift from "../assets/imgs/gift.png";
import {
  decodeAccessToken,
  decodeNickname,
  decodeProfileImg,
  decodeUserRole,
} from "../features/login/loginTokenStore";
import { useGetUserProfile } from "../hooks/mypage/useGetUserProfile";

function Header() {
  const accessToken = cookies.get("access_token");
  const [decodeToken, setDecodeAccessToken] = useRecoilState(decodeAccessToken);
  const nickname = useRecoilValue(decodeNickname);
  const profileImg = useRecoilValue(decodeProfileImg);
  const userRole = useRecoilValue(decodeUserRole);
  const [isLoggedIn, setIsLoggedIn] = useState(accessToken);
  const navigate = useNavigate();
  const [headerState, setHeaderState] = useRecoilState(headerStatedefalut);
  const headerStateFalse = useRecoilValue(headerStateSearch);
  const [, setSearchWord] = useRecoilState(searchWordState);
  const [inputValue, setInputValue] = useState("");
  const [searchWindow, setSearchWindow] = useState(false);
  const { userProfile } = useGetUserProfile(nickname);

  const navList = [
    {
      id: "home",
      title: "홈",
      img: `${headerState.home ? home_gradient : home_gray}`,
      navigation: "/",
      state: headerState.home,
    },
    {
      id: "exhibition",
      title: "전시",
      img: `${headerState.exhibition ? exhibition_gradient : exhibition_gray}`,
      navigation: "/exhibition",
      state: headerState.exhibition,
    },
    {
      id: "artgram",
      title: "아트그램",
      img: `${headerState.artgram ? artgram_gradient : artgram_gray}`,
      navigation: "/artgram",
      state: headerState.artgram,
    },
    {
      id: "mypages",
      title: "마이페이지",
      img: `${headerState.mypages ? user_gradient : user_gray}`,
      navigation: isLoggedIn ? "/mypage" : "/login",
      state: headerState.mypages,
    },
    {
      id: "message",
      title: "메시지",
      img: `${headerState.message ? chat_gradient : chat_gray}`,
      navigation: isLoggedIn ? "/message" : "/login",
      state: headerState.message,
    },
  ];

  const searchhanler = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    } else {
      setSearchWord(inputValue.replace(/\s/g, ""));
      setSearchWindow(false);
      navigate("/search");
      setInputValue("");
    }
  };

  useEffect(() => {
    const accessToken = cookies.get("access_token");
    if (accessToken) {
      setDecodeAccessToken(jwtDecode(accessToken));
    }
  }, []);

  useEffect(() => {
    if (userProfile !== undefined) {
      setDecodeAccessToken({
        ...decodeToken,
        nickname: userProfile.nickname,
        profileImg: userProfile.profileImg,
      });
    }
  }, [userProfile]);

  return (
    <>
      <Headers.Headerwrap>
        <MobileHeaer />
        <Headers.Logo
          onClick={() => navigate("/")}
          children={<img src={logo} alt="logo" />}
        />
        {nickname ? (
          <Headers.LoginState>
            <Headers.LoginStateImg
              children={
                profileImg ? (
                  <img src={profileImg} alt={profileImg} />
                ) : (
                  <img src={profileimage1} alt="비로그인시, 프로필이미지" />
                )
              }
            />
            <Headers.LoginStateNickname children={nickname} />
            {userRole === "UR02" && (
              <Headers.LoginStateAuthor src={palette_gradient} alt="작가권한" />
            )}
          </Headers.LoginState>
        ) : (
          <Headers.LoginState
            className="curserPoint"
            onClick={() => navigate("/login")}
          >
            <Headers.LoginStateImg
              children={
                profileImg ? (
                  <img src={profileImg} alt={profileImg} />
                ) : (
                  <img src={profileimage1} alt="비로그인시, 프로필이미지" />
                )
              }
            />
            <Headers.LoginStateNickname children={"로그인 해주세요!"} />
            {userRole === "UR02" && (
              <Headers.LoginStateAuthor src={palette_gradient} alt="작가권한" />
            )}
          </Headers.LoginState>
        )}
        <Headers.Nav>
          <Headers.NavSearch as="form" onSubmit={searchhanler}>
            <Headers.NavSearchInput
              value={inputValue}
              onMouseDown={() => setSearchWindow(true)}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="검색"
            />
          </Headers.NavSearch>
          {navList.map(({ id, title, img, navigation, state }) => (
            <Headers.NavLists
              key={title}
              state={state}
              id={id}
              onClick={(e) => {
                setHeaderState({ ...headerStateFalse, [id]: true });
                navigate(`${navigation}`);
              }}
            >
              <Headers.Navgateimg src={img} alt={`${title}-${img}`} />
              <Headers.NavgatePath state={state} children={title} />
            </Headers.NavLists>
          ))}
          <Headers.NavLists
            id="survey"
            onClick={() => {
              window.open("https://forms.gle/8gK8e6dUuBABxeb9A", "_blank");
            }}
          >
            <Headers.Navgateimg src={gift} alt={`${gift}`} />
            <Headers.NavgatePath children="유저피드백" />
          </Headers.NavLists>
        </Headers.Nav>
        <Headers.NavBottom>
          {!isLoggedIn ? (
            <>
              <Headers.NavBottomPath
                onClick={() => {
                  navigate("/register");
                }}
                children="회원가입"
              />
              <Headers.NavBottomPath
                onClick={() => {
                  navigate("/login");
                }}
                children="로그인"
              />
            </>
          ) : (
            // : (<>{userRole === "UR02" &&  {/* 작가일 때에만 */}
            <>
              {userRole && (
                <Headers.NavBottomPathEx
                  onClick={() => {
                    navigate("/exhibition/create");
                  }}
                  children="전시등록"
                />
              )}
              <Logout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            </>
          )}
        </Headers.NavBottom>
      </Headers.Headerwrap>
      <OpenSearchWindow
        searchWindow={searchWindow}
        setSearchWindow={setSearchWindow}
      />
    </>
  );
}

export default Header;

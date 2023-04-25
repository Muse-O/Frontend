import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html, body, header, footer, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, ol, ul, li, form, label,input,button,section{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;  // 16px = 1em 
        vertical-align: baseline;
        box-sizing:border-box;
    }

  * {
    @font-face {
      font-family: 'S-CoreDream-3Light';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
      font-weight: normal;
      font-style: normal;
     }

    @font-face {
      font-family: 'SpoqaHanSansNeo-Regular';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
  }

  body {
    font-family: 'SpoqaHanSansNeo-Regular';
  }
`;

export const Wrap = styled.div`
  height: 100%;
`;

export const MainWrap = styled.div`
  position: relative;
  min-height: 100%;
  overflow-x: hidden;
`;

export const ContainerWrap = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;

export const Article = styled.div`
  margin-left: 245px;
  min-height: 100vh;
  /* border: 5px solid blue; */
  background-color: FEFDFC;
  
  @media (max-width: 1440px) {
    margin-left: 183.75px;
}
@media (max-width: 390px) {
  margin-left: 0;
  }
`;


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
  
  @media (max-width: 1440px) {
    width: 183.75px;
    padding:13.5px 17.25px;
  }

  @media (max-width: 390px) {
    width: 100%;
    height: 50px;
    padding:8px;
  }
`;

const Logo = styled.div`
  height: 40px;
  background-color: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  @media (max-width: 390px) {
    display: none;
  }
`
const LoginState = styled.div`
  height: 95px;
  border-bottom: 1px solid #FFFFFF;
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 390px) {
   display: none;
  }
`

const LoginStateImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #D9D9D9;
  @media (max-width: 390px) {
   display: none;
  }
`
const LoginStateNickname = styled.p`
  color: #EBEBEB;
  @media (max-width: 390px) {
   display: none;
  }
`

const Nav = styled.div`
  margin-top: 22px;
  @media (max-width: 390px) {
   display: none;
  }
`

const NavSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  @media (max-width: 390px) {
   display: none;
  }
`

const NavSearchInput = styled.input`
  width: 100%;
  height: 40px;
  background-color: #D9D9D9;
  padding: 12px;
  border-radius: 5px;
  @media (max-width: 390px) {
   display: none;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 23px;
  @media (max-width: 390px) {
   display: none;
  }
`

const Navgate = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50px;
  background-color: #D9D9D9;
  @media (max-width: 390px) {
   display: none;
  }
`
const NavgatePath = styled.p`
  margin-left: 12px;
  font-size: 24px;
  color: #FFFFFF;
  @media (max-width: 1440px) {
    font-size: 18px;
  }
  @media (max-width: 390px) {
   display: none;
  }
`
const NavBottom = styled.div`
  position:absolute;
  left: 0;
  bottom:0;
  width: 100%;
  padding: 10px 0 40px;
  display:flex;
  box-shadow: 0px -15px 9px -2px rgba(37,37,37,0.9);
  flex-direction:column;
  background-color: #252525;
  gap:22px;
  @media (max-width: 390px) {
   display: none;
  }
`
const NavBottomPath = styled.div`
  width: 200px;
  height: 40px;
  margin: 0 auto;
  background-color: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;

  @media (max-width: 1440px) {
    width: 137.75px;
    font-size: 1.5rem;
  }
  @media (max-width: 390px) {
   display: none;
  }
`

const MobileHeaerLayout = styled.div`
  display: none;
  @media (max-width: 390px) {
   display: grid;
   grid-template-columns: 1fr 2fr;
   align-items: center;
   color: white;
   width: 100%;
   height: 100%;
  }
`
const MobileHeaerLogo = styled.img`
  display: block;
  width: fit-content;
  height: 20px;
  font-size: 2rem;
`
const MobileSettings = styled.div`
  width: 100%;
  height: 34px;
  background-color: red;
`

export {
  Headerwrap,
  Logo,
  LoginState,
  LoginStateImg,
  LoginStateNickname,
  Nav,
  NavSearch,
  NavSearchInput,
  NavIcons,
  Navgate,
  NavgatePath,
  NavBottom,
  NavBottomPath,
  MobileHeaerLayout,
  MobileHeaerLogo,
  MobileSettings
}

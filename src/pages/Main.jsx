import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import styled from "styled-components";
import { Flex } from "../components/Flex";

function Main() {
  return (
    <>
      <Header />
      <Article>
        <MainWrap>
          <FirstDiv height="890">
            <MainH4 children="전시 종류" />
          </FirstDiv>
          <SecondDiv height="570">
            <MainH1 children="최신 전시 - 슬라이더 필요"/>
            <SecondWrap ai="center" gap="23">
             {Array(6).fill(null).map(el => (
              <SecondInner>
                <SecondImg/>
                <p className="firstP">제목</p>
                <p className="secondP">2023.04.14-2023.04.20</p>
                <p>위치</p>
              </SecondInner>
             ))}
            </SecondWrap>
            <div style={{minWidth:"40px", minHeight:"40px", backgroundColor:"lightgray", borderRadius:"50px", position:"absolute", top:"10px", right:"0"}}></div>
            <div style={{minWidth:"40px", minHeight:"40px", backgroundColor:"lightgray", borderRadius:"50px", position:"absolute", top:"10px", right:"64px"}}></div>
          </SecondDiv>
          <ThirdDiv height="890">
            <MainH1 children="TOP 10"/>
            <ThirdWrap gap="23" fw="wrap">
            {Array(10).fill(null).map(el => (<ThirdInner/>))}
             
            </ThirdWrap>
          </ThirdDiv>
          <FourthDiv height="655">
            <MainH1 children="예정 전시"/>
          </FourthDiv>
          <FifithDiv height="800">
          <MainH1 children="아트그램"/>
          </FifithDiv>
        </MainWrap>
      </Article>
    </>
  );
}

export default Main;

const MainWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  /* background-color: yellow; */
  margin: 65px 75px;
`;

const FirstDiv = styled.div`
  width: 100%;
  background-color: #ff950098;;
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`

const SecondDiv = styled.div`
  width: 100%;
  position: relative;
  /* background-color: #a6ff0097;; */
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`

    const SecondWrap = styled(Flex)`
      /* background-color: white; */
      margin-top: 36px;
    `

    const SecondInner = styled.div`
      min-width: 235px;
      max-width: 235px;
      min-height: 390px;
      max-height: 390px;
      background-color: lightgray;

      p {
        font-family: 'SpoqaHanSansNeo-Regular';
        font-size: 16px;
      }

      .firstP {
        margin-top: 24px;
        font-size: 20px;
      }
      .secondP{
        margin-top: 4px;
        color: #5A5A5A;
      }
    `

      const SecondImg = styled.img`
        background-color: #f2f2f2;
        display: block;
        min-width: 235px;
        max-width: 235px;
        min-height: 290px;
        max-height: 290px;
      `

const ThirdDiv = styled.div`
  width: 100%;
  /* background-color: #00eaff96;; */
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`
    const ThirdWrap = styled(Flex)`
    /* background-color: white; */
    margin-top: 36px;
    `

const ThirdInner = styled.div`
  min-width: 751px;
  max-width: 751px;
  min-height: 148px;
  max-height: 148px;
  margin-bottom: -23px;
  border-bottom: 1px solid #D9D9D9;
  background-color: #f5f5f59a;
`


const FourthDiv = styled.div`
  width: 100%;
  background-color: #8c00ff95;;
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`

const FifithDiv = styled.div`
  width: 100%;
  background-color: #ff007795;;
  max-height: ${pos=>pos.height}px;
  min-height: ${pos=>pos.height}px;
`

const MainH1 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 32px;
`

const MainH4 = styled.h4`
  font-family: 'S-CoreDream-3Light';
  font-size: 24px;
`
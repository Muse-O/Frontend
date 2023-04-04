import React from "react";
import styled from "styled-components";
import { Flex } from "./Flex";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Headerwrap>
      <Flex fd="column">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로
        </button>
        <button
          onClick={() => {
            navigate("/artgram");
          }}
        >
          아트그램
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
        <button
          onClick={() => {
            navigate("/artgram/create");
          }}
        >
          아트그램만들기
        </button>
        <button
          onClick={() => {
            navigate("/exhibition/create");
          }}
        >
          전시회 작성페이지
        </button>
        <button
          onClick={() => {
            navigate("/exhibition/update");
          }}
        >
          전시회 상세페이지
        </button>
        <button
          onClick={() => {
            navigate("/exhibition");
          }}
        >
          전시회 페이지
        </button>
        <button
          onClick={() => {
            navigate("/mypage");
          }}
        >
          마이 페이지
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          회원가입 페이지
        </button>

        <FootingArea>푸터 컨탠츠</FootingArea>
      </Flex>
    </Headerwrap>
  );
}

export default Header;

const Headerwrap = styled.header`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 245px;
  z-index: 10100;
  border: 5px solid red;
`;

const FootingArea = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  color: white;
`;

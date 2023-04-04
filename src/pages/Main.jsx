import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import styled from "styled-components";

function Main() {
  return (
    <>
      <Header />
      <Article>
        <Div>컨탠츠 구역</Div>
      </Article>
    </>
  );
}

export default Main;

const Div = styled.div`
  border: 1px solid black;
`;

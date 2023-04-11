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
  background-color: lightyellow;
`;


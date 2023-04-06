import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  min-height: 110px;
  border: 2px dotted gray;
  border-radius: 8px;
  padding: 18px;
  text-align: center;
`

const DragText = styled.div`
  font-size: 1.3rem;
`

const DragIcon = styled.div`
  width: 100px;
  height: 40px;
  margin: 0 auto;
  font-size: 3rem;
`

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16;
  gap: 13px;
`

const Thumb =  styled.div`
  display: inline-flex;
  border-radius: 2;
  border: 4px solid #eaeaea;
  margin-bottom: 8;
  margin-right: 8;
  width: 130px;
  height: 130px;
  padding: 4;
  box-sizing: border-box;
`

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`

const Thumbimg = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

export {
  Section,
  DragText,
  DragIcon,
  ThumbsContainer,
  Thumb,
  ThumbInner,
  Thumbimg
}
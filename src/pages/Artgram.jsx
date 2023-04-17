import React from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import { useInterserctionObserver } from "../hooks/artgram/newArtgram/useIntersectionObserver";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsPen } from "react-icons/bs";

function Artgram() {
  // InterserctionObserver 포함(window.scrollTo(0,0) 설정)
  const { ref } = useInterserctionObserver();
  // 하단에 아트그램 글쓰기 이동을 위한 react-router-dom
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Article>
        <ArtgramLayout>
        <ArtgramH1>아트그램 <span>Artgram</span></ArtgramH1>
        <ArtgramWrap>
          {artgramList.map((el,index) => {
            return index + 1 === 16 ? (
              <ArtgramBox key={index} ref={ref}>
                <div className="imgWrap">
                  <img src="https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png" />
                </div>
                <div className="artgraminfo">
                  <div>PFimg</div>
                  <div>마지막{el}</div>
                  <div>scrap</div>
                  <div>liked</div>
                </div>
              </ArtgramBox>
            ) : (
              <ArtgramBox key={index}>
                <div className="imgWrap">
                  <img src="https://cdn.mhns.co.kr/news/photo/202109/511451_618343_3128.png" />
                </div>
                <div className="artgraminfo">
                  <div>PFimg</div>
                  <div>Nick{el}</div>
                  <div>scrap</div>
                  <div>liked</div>
                </div>
              </ArtgramBox>
            );
          })}
        </ArtgramWrap>
        {/* infinetyScroll 및 글쓰기 버튼공간 */}
        <ArtgramWrite onClick={() => navigate("/artgram/create")}
            children={
              <p>
                <BsPen />
              </p>
            }>
        </ArtgramWrite>
        </ArtgramLayout>
      </Article>
    </>
  );
}

export default Artgram;

const ArtgramLayout = styled.div`
  padding: 80px 75px;
`
const ArtgramH1 = styled.h1`
  font-size: 48px;
  font-family: 'S-CoreDream-3Light';

  span {
    font-family: 'Montserrat';
    font-size: 32px;
  }
`

const ArtgramWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 23px;
  width: 100%;
  margin-top: 60px;
  /* background-color: lightcoral; */
`;

const ArtgramBox = styled.div`
  height: 426px;
  box-shadow: 0px 4px 7px #878787;
  border-radius: 5px;
  background-color: #EFEFEF;
  
  .imgWrap {
    min-height: 354px;
    max-height: 354px;
    overflow: hidden;
  }

  img {
    width: 100%;
    border-radius: 5px 5px 0 0;
    background-color: lightgreen;
  }

  .artgraminfo {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 61px;
    padding: 16px 12px;
    align-items: center;
  }

`

const ArtgramWrite = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: #fff;
  border: 1px solid #3c3c3c;

  p {
    font-size: 3rem;
  }
`;

const artgramList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
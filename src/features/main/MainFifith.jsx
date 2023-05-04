import React, { useState } from "react";
// import CSS --------------------------------------------------------------------------------------------/
import * as Main from "./css/mainparts";
// import Library-----------------------------------------------------------------------------------------/
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useOpenModal } from '../../hooks/main/useOpenModal'
import { useCurrentArtgram } from "../../hooks/main/useCurrentArtgram";
import { useAsNavForSliderMainFifith } from "../../hooks/main/useAsNavForSliderMainFifith";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import ArtgarmDetailModal from '../artgram/detailModal/ArtgarmDetailModal'

function MainFifith() {
  const navigate = useNavigate()
  const { modalState, openModalhandle } = useOpenModal();
  const [ modalArtgramId, setModalArtgramId ] = useState(null);
  const { isLoading, isError, data, editLists } = useCurrentArtgram();
  const { mainSliderSettings, subSliderSettings, currentSlideIndex } = useAsNavForSliderMainFifith();

  return (
    <Main.FifthLayout height="640"  media1440="480">
      <Main.ArticleTitle>
        <Main.MainH1 children="아트그램" />
        <Main.MainH5 children="더보기 >" onClick={()=>navigate('/artgram')}/>
      </Main.ArticleTitle>
      { isLoading || isError
        ? <div style={{marginTop:"66px"}}>로딩 중...</div>
        : data && data.length === 0 
        ? <div style={{marginTop:"66px"}}>데이터가 없습니다...</div>
        : 
        <Main.FifthWrapGrid>
        <Main.MainSlider>
          <Slider {...mainSliderSettings}>
            {data && data.map(artgram => (
              <Main.MainSliderWrap className="curserPoint" key={artgram?.artgramId} onMouseOver={()=>setModalArtgramId(artgram.artgramId)} onClick={() =>openModalhandle(artgram.artgramId)}>
                <Main.MainSliderImg children={<img className="artgramimg" src={artgram.imgUrl}/>}/>
                <Main.MainSliderProfile>
                  <Main.MainSliderProfileImg src={artgram.authorProfileImg} alt="authorProfileImg"/>
                  <Main.MainSliderProfileNickName children={<>by <span>{artgram.authorNickName}</span></>} />
                </Main.MainSliderProfile>
              </Main.MainSliderWrap>
            ))}
          </Slider>
        </Main.MainSlider>
        <Main.SubSlider>
          <Slider {...subSliderSettings}>
            {editLists && editLists?.map(artgram => (
                <Main.SubSliderLayout className="curserPoint" key={artgram?.artgramId} onMouseOver={()=>setModalArtgramId(artgram.artgramId)} onClick={() =>openModalhandle(artgram.artgramId)}>
                  <Main.SubSliderWrap>
                    <Main.SubSliderImg children={<img className="artgramimg" src={artgram.imgUrl}/>}/>
                    <Main.SubSliderProfile>
                      <Main.MainSliderProfileImg src={artgram.authorProfileImg} alt="authorProfileImg"/>
                      <Main.MainSliderProfileNickName children={<>by <span>{artgram.authorNickName}</span></>} />
                    </Main.SubSliderProfile>
                  </Main.SubSliderWrap>
              </Main.SubSliderLayout>
            ))}
          </Slider>
        </Main.SubSlider>
        <Main.SliderIndex children={currentSlideIndex < 10 
            ? <>0{currentSlideIndex}&nbsp;<span>/ 0{editLists.length}</span></> 
            : <>{currentSlideIndex}&nbsp;<span>/ {editLists.length}</span></>}/>
      </Main.FifthWrapGrid>
        }
      {modalState && (
          <>
            {data.map(   
              ({artgramId}) =>
                artgramId === modalArtgramId && (                
                  <ArtgarmDetailModal key={artgramId} artgramId={artgramId} modalState={modalState} openModalhandle={openModalhandle}/>
                )
            )}
          </>
        )}
    </Main.FifthLayout>
  );
}

export default MainFifith;
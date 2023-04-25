import React, { useState } from "react";
import * as Main from "./css/mainparts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAsNavForSliderMainFifith } from "../../hooks/main/useAsNavForSliderMainFifith";
import { useCurrentArtgram } from "../../hooks/main/useCurrentArtgram";
import { useOpenModal } from '../../hooks/main/useOpenModal'
import ArtgarmDetailModal from '../artgram/detailModal/ArtgarmDetailModal'

function MainFifith() {
  // 서버로 부터 받아 온 배열을 슬라이더의 목적에 따라 가공하는 커스텀 훅
  const { firstSliderSettings, secondSliderSettings, currentSlideIndex } =
    useAsNavForSliderMainFifith();

  // 상세모달 
  const { modalState, openModalhandle } = useOpenModal();
  const [modalArtgramId, setModalArtgramId] = useState(null);

  const { isLoding, isError, data } = useCurrentArtgram();
  let editLists;
  if(data) {
    const editList = [...data]
    const editshiftitem = editList.shift()
    editList.push(editshiftitem)
    editLists = editList
  }

  return (
    <Main.CommenLayout height="637">
      <Main.ArticleTitle>
        <Main.MainH1 children="아트그램" />
      </Main.ArticleTitle>
      <Main.FifithWrap>
        {/* Fifth-MainSlider*/}
        <div>
          {isLoding || isError || !data ? (
            "로딩 중 ..."
          ) : (
            <Slider {...firstSliderSettings}>
              {data.map((artgram) => (
                <Main.FifithMainSlider key={artgram.artgramId} onMouseOver={()=>setModalArtgramId(artgram.artgramId)} onClick={() =>openModalhandle(artgram.artgramId)}>
                 {/* <Main.FifithMainSlider key={artgram.artgramId}> */}
                  <div className="artgramimg">
                    <img
                      src={artgram.imgUrl}
                      alt="인기 아트그램"
                      height="404px"
                      style={{
                        display:"block", 
                        margin:"0 auto",
                        transform:"t"
                      }}
                    />
                  </div>
                  <div className="profile">
                    <div className="profileimg">
                    <img
                      src={artgram.authorProfileImg}
                      alt="인가 아트그램"
                      height="100%"
                      style={{display:"block", margin:"0 auto", borderRadius:"50px"}}
                    />
                    </div>
                    <div className="profileNickname">
                      <p>
                        <span>by</span> {artgram.authorNickName}
                      </p>
                    </div>
                  </div>
                </Main.FifithMainSlider>
              ))}
            </Slider>
          )}
        </div>

        {/* Fifth-SubSlider*/}
        <Main.FifithSubSliderLayout>
          {editLists && (
            <Slider {...secondSliderSettings}>
            {editLists.map((artgram) => (
              <Main.FifithSubSliderWrap key={artgram.artgramId}  onMouseOver={()=>setModalArtgramId(artgram.artgramId)} onClick={() => openModalhandle()}>
                <div className="subsliderInner">
                  <div className="subsliderimg">
                    <img
                      src={artgram.imgUrl}
                      alt="인가 아트그램"
                      height="100%"
                      style={{display:"block", margin:"0 auto"}}
                    />
                  </div>
                  <div className="profile">
                    <div className="profileimg">
                    <img
                      src={artgram.authorProfileImg}
                      alt="인가 아트그램"
                      height="100%"
                      style={{display:"block", margin:"0 auto", borderRadius:"50px"}}
                    />
                    </div>
                    <div className="profileNickname">
                      <p>
                        <span>by</span> {artgram.authorNickName}
                      </p>
                    </div>
                  </div>
                </div>
              </Main.FifithSubSliderWrap>
            ))}
          </Slider>
          )}
          <Main.FifthCurrentSliderIndex>
            <p>
              0{currentSlideIndex} <span>/ 0{data?.length}</span>
            </p>
          </Main.FifthCurrentSliderIndex>
        </Main.FifithSubSliderLayout>
      </Main.FifithWrap>
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
    </Main.CommenLayout>
  );
}

export default MainFifith;
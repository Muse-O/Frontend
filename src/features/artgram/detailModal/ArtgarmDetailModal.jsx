import React from "react";
// import CSS & icons & png ------------------------------------------------------------------------------/
import * as Artgramparts from "../css/ArtgramCss";
import * as DetailModal from '../css/ArtgramDetailModalCss'
import cancel_WGray from '../../../assets/imgs/common/cancel_WGray.png'
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useGetartgramDetail } from "../../../hooks/artgram/useGetartgramDetail";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import ArtgramSlider from "../ArtgramSlider";
import ArtgramDetailContent from "./ArtgramDetailContent";
import ArtgramDetailComments from "./ArtgramDetailComments";
import ArtgramDetailCommentWrite from "./ArtgramDetailCommentWrite";

function ArtgarmDetailModal({ artgramId, modalState, openModalhandle,searchWord }) {
  const [detailIsLoading, detailIsError, detailData] = useGetartgramDetail(artgramId); 
  return (
    <>
      <Artgramparts.ModalBackground
        state={modalState}
        onClick={(e) => {
          e.stopPropagation();
          openModalhandle();}} 
        children={<img className="curserPoint" src={cancel_WGray}/>}/>
      <Artgramparts.ModalWindow
        state={modalState}
        onClick={(e) => e.stopPropagation()}>  
        {detailIsLoading || detailIsError
        ? (<div>로딩 중...</div>) 
        : (<>
            <DetailModal.SliderOutline
              children={detailData.ArtgramImgs.length > 1 
                ? (<div className="sliderLayout">
                    <ArtgramSlider map={detailData.ArtgramImgs} />
                  </div>) 
                : (<img src={detailData.ArtgramImgs[0].imgUrl} width="100%" />)} />
            <DetailModal.ModalContent>
              <ArtgramDetailContent detailData={detailData}/>
              <ArtgramDetailComments artgramId={artgramId}/>
              <ArtgramDetailCommentWrite artgramId={artgramId} detailData={detailData} searchWord={searchWord}/>
            </DetailModal.ModalContent>
          </>
        )}
      </Artgramparts.ModalWindow>
    </>
  );
}

export default ArtgarmDetailModal;

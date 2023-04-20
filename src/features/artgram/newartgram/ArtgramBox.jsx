import React from "react";
import * as Artgramparts from "./ArtgramCss";
import { BsBookmarkFill, BsFillHeartFill, BsFiles } from "react-icons/bs";
import { useLikes } from "../../../hooks/artgram/useLikes";
import { useScrap } from "../../../hooks/artgram/useScrap";
import { useOpenModal } from "../../../hooks/artgram/useOpenModal";
import ArtgarmDetailModal from "./ArtgarmDetailModal";

function ArtgramBox({ info }) {
  const {
    artgramId,
    imgUrl,
    imgCount,
    profileImg,
    nickname,
    scrapCount,
    scrap,
    likeCount,
    liked,
  } = info;

  const { patchLikes } = useLikes();
  const { patchScrap } = useScrap();
  // Modal 관련 함수 
  const {modalState, openModalhandle} = useOpenModal();

  return (
    <Artgramparts.ArtgramboxWrap onClick={() => openModalhandle()}>
      <div className="imgWrap">
        <img className="artgramimg" src={imgUrl} alt="아트그램 이미지" />
      </div>
      <div className="artgraminfo">
        <div
          className="artgramProfileImg"
          children={<img src={profileImg} alt="artgramProfileImg" />}
        />
        <div className="artgramProfileNickname">
          <span>by</span> {nickname}
        </div>
        <Artgramparts.Scrap
          state={scrap}
          onClick={(event) => {
            event.stopPropagation();
            patchScrap(artgramId);
          }}
        >
          <p>
            <BsBookmarkFill />
          </p>
          <p>{scrapCount}</p>
        </Artgramparts.Scrap>
        <Artgramparts.Heart
          state={liked}
          onClick={(event) => {
            event.stopPropagation();
            patchLikes(artgramId);
          }}
        >
          <p>
            <BsFillHeartFill />
          </p>
          <p>{likeCount}</p>
        </Artgramparts.Heart>
      </div>
      {imgCount > 1 && (
        <Artgramparts.PluralImgs
          children={
            <p>
              <BsFiles />
            </p>
          }
        />
      )}
      
      {/* 상세모달 창 열기 */}
      {modalState && (
        <ArtgarmDetailModal artgramId={artgramId} modalState={modalState} openModalhandle={openModalhandle}/>
      )}
    </Artgramparts.ArtgramboxWrap>
  );
}

export default ArtgramBox;

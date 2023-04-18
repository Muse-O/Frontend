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

// artgramId: "7c4917c8-5e92-4fe8-a1bc-d8953ec10a45"
// artgramTitle: "테스트"
// createdAt: "2023-04-15 15:00:56"
// imgCount: 1
// imgUrl: "https://woog-s3-bucket.s3.amazonaws.com/artgram/418abc7a-0ea7-43e8-a0f8-6a6e47bb99d5.png"
// likeCount: 2
// liked: false
// nickname: "edwin01"
// profileImg: "https://avatars.githubusercontent.com/u/51357635?s=400&u=36fd01b69ccd7729620c086927f9c0847ffdb0e1&v=4"
// scrap: false
// scrapCount: 0
// userEmail: "gg@g.com"

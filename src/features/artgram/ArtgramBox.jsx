import React, { useEffect } from "react";
// import CSS & icons & png ------------------------------------------------------------------------------/
import * as Artgramparts from "./css/ArtgramCss";
// import { BsBookmarkFill, BsFillHeartFill } from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai"
import {RiBookmarkFill} from "react-icons/ri"
import overlap_gray from '../../assets/imgs/artgram/overlap_gray.png'
// import Library-----------------------------------------------------------------------------------------/
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { decodeUserRole } from "../login/loginTokenStore";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useLikes } from "../../hooks/artgram/useLikes";
import { useScrap } from "../../hooks/artgram/useScrap";
import { useOpenModal } from "../../hooks/artgram/useOpenModal";
import { usePostSearchWord } from "../../hooks/search/usePoseSearchWord";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import ArtgarmDetailModal from "./detailModal/ArtgarmDetailModal";


function ArtgramBox({ info, searchWord, postSearchWords }) {
  const { artgramId, imgUrl, imgCount, profileImg,nickname, scrapCount, scrap, likeCount, liked,} 
  = info; 
  const { patchScrap } = useScrap(searchWord); 
  const { patchLikes } = useLikes(searchWord); 
  const {modalState, openModalhandle} = useOpenModal(); 
  const userRole = useRecoilValue(decodeUserRole)
  const {postSearchWord} = usePostSearchWord()
  const navigate = useNavigate()
  const artgramEvent = () => {
    if(postSearchWords?.type) {
      const {type, title} = postSearchWords
      postSearchWord({type, title})
      openModalhandle()
    } else {
      openModalhandle()
    }
  }

  return (
    <Artgramparts.BoxWrap onClick={() => artgramEvent()}>
      <Artgramparts.BoxImg className="curserPoint"  children={<img className="artgramimg" src={imgUrl} alt="아트그램 이미지" />}/>
      <Artgramparts.BoxProfile className="curserPoint" >
        <Artgramparts.BoxProfileimg
          children={<img src={profileImg} alt="artgramProfileImg" />} />
        <Artgramparts.BoxProfileNickname 
          children={<><span>by</span> {nickname}</>} />
        <Artgramparts.Scrap
          state={scrap}
          onClick={(event) => {
            event.stopPropagation();
            !userRole && window.confirm("회원만 가능합니다. 로그인 하시겠습니까?") && navigate('/login')
            searchWord && userRole && patchScrap(artgramId)
            !searchWord && userRole && patchScrap(artgramId)}}
          children={
            <>
              <p children={<RiBookmarkFill />} />
              <p children={scrapCount}/>
            </>}/>
        <Artgramparts.Heart
          state={liked}
          onClick={(event) => {
            event.stopPropagation();
            !userRole && window.confirm("회원만 가능합니다. 로그인 하시겠습니까?") && navigate('/login')
            userRole && patchLikes(artgramId)
            
          }}
          children={
            <>
              <p children={<AiFillHeart />} />
              <p children={likeCount}/>
            </>} />
      </Artgramparts.BoxProfile>
      {imgCount > 1 && (
        <Artgramparts.PluralImgs children={<img src={overlap_gray} alt="복수이미지표시" />} />)}
      {modalState && (<ArtgarmDetailModal artgramId={artgramId} modalState={modalState} openModalhandle={openModalhandle} searchWord={searchWord}/>)}
    </Artgramparts.BoxWrap>
  );
}

export default ArtgramBox;

import React from 'react'
import {BsHeartFill} from 'react-icons/bs' 
import * as Artgramparts from './Artgramparts'
import { usePostingtime } from '../../hooks/artgram/usePostingtime'
import {IoMdImages} from 'react-icons/io'

const ArgramBox = ({pos}) => {
  // pos으로 전달받은 내용 구조분해 할당 ------------------------------------------------------------------------------- //
  const {
    artgramId,
    artgramTitle,
    imgCount,
    imgUrl,
    likeCount,
    liked,
    profileImg,
    nickname,
    userEmail,
    openModalhandle
  } = pos;

  // GET : allArtgram.Posting 의 시간을 구하는 커스텀 훅 -------------------------------------------------------------- //
  const [timehandle] = usePostingtime()  
  // ArgramBox의 뷰 파트 ------------------------------------------------------------------------------------------ //
  return (
    <>
    {/* ArgramBox의 개별 Argram 뷰파트 ---------------------------------------------------------------------- */}
    <Artgramparts.Artgrambox
      fd="column"
      gap="10"
      onClick={() => openModalhandle(artgramId)}>
      <Artgramparts.Img src={imgUrl && imgUrl} />
      <Artgramparts.H1 fs="2rem" children={artgramTitle} />
      <Artgramparts.UserFlex>
        <Artgramparts.ProflieBox url={profileImg} />
        <Artgramparts.Nickname
          children={
            <>
              <span>by</span> {nickname}
            </>
          }
        />
        <Artgramparts.Likes
          children={
            <>
              <span>
                <BsHeartFill color={liked && "#FB6E52" || "lightgray"}/>
              </span>{" "}
              {likeCount}
            </>
          }
        />
      </Artgramparts.UserFlex>
      {/* 사진 복수 유무에 따른 조건부 렌더링 --------------------------------------------------------------------- */}
      {imgCount > 1 && (
        <Artgramparts.PluralImgs
          children={
            <p>
              <IoMdImages />
            </p>
          }
        />
      )}
    </Artgramparts.Artgrambox>
    </>
  );
}

export default ArgramBox
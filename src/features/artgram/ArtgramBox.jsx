import React from 'react'
import {BsHeartFill} from 'react-icons/bs' 
import * as Artgramparts from './Artgramparts'
import { usePostingtime } from '../../hooks/artgram/usePostingtime'
import {IoMdImages} from 'react-icons/io'

const ArgramBox = ({pos}) => {
  // pos으로 전달받은 내용 구조분해 할당 ------------------------------------------------------------------------------- //
  const {
    artgramId,
    profileImg,
    artgramTitle,
    artgramDesc,
    createdAt,
    profileNickname,
    ArtgramImgs,
    openModalhandle,
    artgramCommentCount
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
      <Artgramparts.Img src={ArtgramImgs && ArtgramImgs[0]?.imgUrl} />
      <Artgramparts.H1 fs="2rem" children={artgramTitle} />
      <Artgramparts.Desc children={artgramDesc} />
      {/* 댓글 유무에 따른 조건부 렌더링 ----------------------------------------------------------------------- */}
      {artgramCommentCount ? (
        <Artgramparts.Posting
          children={`${timehandle(createdAt)}  ･ 댓글 ${artgramCommentCount}개`}
        />
      ) : (
        <Artgramparts.Posting children={`${timehandle(createdAt)}`} />
      )}
      <Artgramparts.UserFlex>
        <Artgramparts.ProflieBox url={profileImg} />
        <Artgramparts.Nickname
          children={
            <>
              <span>by</span> {profileNickname}
            </>
          }
        />
        <Artgramparts.Likes
          children={
            <>
              <span>
                <BsHeartFill />
              </span>{" "}
              265명
            </>
          }
        />
      </Artgramparts.UserFlex>
      {/* 사진 복수 유무에 따른 조건부 렌더링 --------------------------------------------------------------------- */}
      {ArtgramImgs.length > 1 && (
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
import React from 'react'
import {BsHeartFill} from 'react-icons/bs' 
import * as Artgramparts from './Artgramparts'
import { usePostingtime } from '../../hooks/artgram/usePostingtime'

function ArgramBox(pos) {
  // GET : allArtgram.Posting 의 시간을 구하는 커스텀 훅
  const {
    artgramId,
    profileImg,
    artgramTitle,
    artgramDesc,
    createdAt,
    profileNickname,
    ArtgramImgs,
    openModalhandle,
  } = pos.pos;
  const [timehandle] = usePostingtime()  
  return (
     <Artgramparts.Artgrambox
                    
                    fd="column"
                    gap="15"
                    onClick={() => openModalhandle(artgramId)}
                  >
                    <Artgramparts.Img
                      src={ArtgramImgs && ArtgramImgs[0].imgUrl}
                    />
                    <Artgramparts.H1 fs="2rem" children={artgramTitle} />
                    <Artgramparts.Desc children={artgramDesc} />
                    <Artgramparts.Posting
                      children={`${timehandle(createdAt)} ･ 22개의 댓글`}
                    />
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
                  </Artgramparts.Artgrambox>
  )
}

export default ArgramBox
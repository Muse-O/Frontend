import React, { useState } from "react";
import {BsHeartFill} from 'react-icons/bs'
import Header from "../components/Header";
import { Article, Wrap } from "../shared/GlobalStyled";
import { useGetartgram } from "../hooks/artgram/useGetartgram";
import * as Artgramparts from '../features/artgram/Artgramparts'
import { usePostingtime } from "../hooks/artgram/usePostingtime";
import * as Modal from './ArtgramModal' 

function Artgram() {
  const [isLoading, isError, allArtgram] = useGetartgram()
  const [timehandle] = usePostingtime()
  console.log(allArtgram)

  const [modalArtgramId, setModalArtgramId] = useState(null);
  const [modalState, setModalState] = useState(false)
  const openModalhandle = (artgramId) => {
    setModalArtgramId(artgramId)
    setModalState(pre => !pre)
  }

  if(isLoading || isError) {
    return <div>로딩 중....</div>
  }

  return (
    <>
      <Header />
      <Article>
        <Wrap>
          <Artgramparts.H1 fs="3rem" type="아트그램" children="아트그램" />
          <Artgramparts.MainFlex ai="center" gap="19" fw="wrap">
            {allArtgram.map(
              ({
                artgramId,
                profileImg,
                artgramTitle,
                artgramDesc,
                createdAt,
                profileNickname,
                ArtgramImgs,
              }) => {
                return (
                  <Artgramparts.Artgrambox
                    key={artgramId}
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
                );
              }
            )}
          </Artgramparts.MainFlex>
        </Wrap>
        {/* 상세모달 관련 구역 */}
        {modalState && (
          <>
            {allArtgram.map(
              (allArtgram) =>
                allArtgram.artgramId === modalArtgramId && (
                  <div key={allArtgram.artgramId}>
                    <Modal.ModalBackground state={modalState} />
                    <Modal.ModalWindow state={modalState}>
                      {allArtgram.artgramId}
                      <div onClick={() => setModalState((pre) => !pre)}>
                        버튼
                      </div>
                    </Modal.ModalWindow>
                  </div>
                )
            )}
          </>
        )}
      </Article>
    </>
  );
}

export default Artgram;

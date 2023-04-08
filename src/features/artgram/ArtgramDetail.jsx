import React from 'react'
import { useFormInput } from '../../hooks/useFormInput'
import { usePostcomments } from '../../hooks/artgram/usePostcomments'
import * as Modal from './ArtgramModal' 
import { Flex } from '../../components/Flex'
import { Input } from '../../components/Input'
import * as Artgramparts from './Artgramparts'
import {BiDotsHorizontalRounded} from 'react-icons/bi' 
import { useGetartgramComments } from '../../hooks/artgram/useGetartgramComments'

function ArtgramDetail(pos) {
  const {allArtgram, modalState, setModalState} = pos.pos
  // 아트그램 상세모달페이지: 댓글 POST 관련 --------------------------------------------------------------------------- //
  const [formState, setFormState, handleInputChange] = useFormInput();
  const [commentHandle] = usePostcomments(setFormState)
  const [isLoading, isError, data] = useGetartgramComments(allArtgram.artgramId)
  return (
    <>
      {/* 상세모달페이지 바깥배경 ---------------------------------------------------------------------- */} 
      <Modal.ModalBackground state={modalState} />
      {/* 상세모달페이지 안쪽내용 ---------------------------------------------------------------------- */} 
      <Modal.ModalWindow state={modalState}>
        <Flex>
          {/* 상세모달페이지 (1) 이미지 삽입공간 --------------------------------------------------------- */} 
          <Modal.ModalinnerImgDiv width="70%">
            <Modal.ModdalinnerImg
              src={allArtgram.ArtgramImgs[0].imgUrl}
            />
          </Modal.ModalinnerImgDiv>
          {/* 상세모달페이지 (2) 텍스트 공간 ------------------------------------------------------------ */} 
          <Modal.ModalinnerDiv width="30%">
          {/* 상세모달페이지 (2-1) 사용자 정보 및 모달닫기 공간 ------------------------ */}   
            <Modal.ModalUsers>
              <Flex>
                <Artgramparts.ProflieBox
                    url={allArtgram.profileImg}
                  />
                <Artgramparts.Nickname
                  children={
                    <>
                      <span>by</span> {allArtgram.profileNickname}
                    </>
                  }
                />
                <div className='options'
                  onClick={() => setModalState((pre) => !pre)}>
                  <BiDotsHorizontalRounded />
                </div>
              </Flex>
            </Modal.ModalUsers>
            {/* 상세모달페이지 (2-2) artgram Desc ------------------------------ */}   
            <Modal.ModalInner>
              <div>
                <Artgramparts.ProflieBox
                  url={allArtgram.profileImg}
                />
              </div>
              <Flex fd="column" jc="center">
                <Flex style={{ minHeight: "40px" }} ai="center">
                  <p>{allArtgram.profileNickname}</p>
                </Flex>
                <div>
                  <p>{allArtgram.artgramDesc}</p>
                </div>
              </Flex>
            </Modal.ModalInner>
            {/* 상세모달페이지 (2-3) artgram 댓글관련열람 ------------------------- */}   
            <div style={{maxHeight:"670px", backgroundColor:"orange", overflow:"scroll"}}>
              {/* ---------------------------------------- */}
              <Modal.ModalInner>
                <div>
                  <Artgramparts.ProflieBox
                    url={allArtgram.profileImg}
                  />
                </div>
                <Flex fd="column" jc="center">
                  <Flex style={{ minHeight: "40px" }} ai="center">
                    <p>{allArtgram.profileNickname}</p>
                  </Flex>
                  <div>
                    <p>{allArtgram.artgramDesc}</p>
                  </div>
                </Flex>
              </Modal.ModalInner>
              {/* ---------------------------------------- */}
            </div>
            {/* 상세모달페이지 (2-4) artgram 댓글입력공간 ------------------------- */}   
            <Modal.ModalCommentsBox>
              <form onSubmit={(e) =>commentHandle(e, allArtgram.artgramId, formState.comment)}>
                <Input
                  inputProps={{
                    type: "text",
                    name: "comment",
                    value: formState["comment"] || "",
                    placeholder:"댓글 달기...",
                    onChange: handleInputChange,
                  }}
                />
              </form>
            </Modal.ModalCommentsBox>
          </Modal.ModalinnerDiv>
           {/* ------------------------------------------------------------------------------------ */} 
        </Flex>
      </Modal.ModalWindow>
    </>
  )
}

export default ArtgramDetail
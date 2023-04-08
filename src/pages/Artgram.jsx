import React, { useState } from "react";
import {BsHeartFill} from 'react-icons/bs' 
import {BiDotsHorizontalRounded} from 'react-icons/bi' 
import Header from "../components/Header";
import { Article, Wrap } from "../shared/GlobalStyled";
import { useGetartgram } from "../hooks/artgram/useGetartgram";
import * as Artgramparts from '../features/artgram/Artgramparts'
import { usePostingtime } from "../hooks/artgram/usePostingtime";
import * as Modal from './ArtgramModal' 
import { Flex } from "../components/Flex";
import styled from 'styled-components'
import { useFormInput } from "../hooks/useFormInput";
import { Input } from "../components/Input";
import { useMutation } from "@tanstack/react-query";
import { apis } from "../api/apis";
import { cookies } from "../shared/cookies";


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

  const [formState, setFormState, handleInputChange] = useFormInput();

  const {mutate:postCommet} = useMutation({
    mutationFn : async ({artgramId, formState}) => {
      const token = cookies.get("access_token");
      console.log(token);
      console.log(`${artgramId}, ${formState}`);
      const response = await apis.post(`/artgram/${artgramId}/comments`, {comment:formState}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response;
    }
  })

  const commentHandle = (e, artgramId, formState) => {
    e.preventDefault()
    postCommet({artgramId, formState})
    setFormState({})
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
                      <Flex>
                        <ModalinnerDiv width="70%">
                          <ModdalinnerImg
                            src={allArtgram.ArtgramImgs[0].imgUrl}
                          />
                        </ModalinnerDiv>
                        <ModalinnerDiv width="30%">
                          <div
                            style={{
                              padding: "10px",
                              borderBottom: "1px solid gray",
                              position: "relative",
                            }}
                          >
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
                              <div
                                onClick={() => setModalState((pre) => !pre)}
                                style={{
                                  fontSize: "2rem",
                                  position: "absolute",
                                  top: "50%",
                                  right: "20px",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                <BiDotsHorizontalRounded />
                              </div>
                            </Flex>
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "60px 1fr",
                              padding: "10px",
                            }}
                          >
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
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: "0",
                              backgroundColor: "yellow",
                              width: "100%",
                              minHeight: "100px",
                            }}
                          >
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
                          </div>
                        </ModalinnerDiv>
                      </Flex>
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


const ModalinnerDiv = styled.div`
  position: relative;
  width: ${pos => pos.width};
`

const ModdalinnerImg = styled.img`
  display: block;
  width: 100%;
  
`
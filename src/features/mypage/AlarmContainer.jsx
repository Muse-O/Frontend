import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAlramInfo } from "../../hooks/mypage/useGetAlramInfo";
import { usePatchAlramInfo } from "../../hooks/mypage/usePatchAlramInfo";
import { useOpenModal } from "./../../hooks/artgram/useOpenModal";
import ArtgarmDetailModal from "./../artgram/detailModal/ArtgarmDetailModal";
import bell from "../../assets/imgs/mypage/bell_gray.png";
import likeIcon from "../../assets/imgs/common/heart_red.png";
import commentIcon from "../../assets/imgs/mypage/chat_blue.png";
import * as Style from "../mypage/css/AlarmContainerStyle";

function AlarmContainer() {
  const { modalState, openModalhandle } = useOpenModal(); //아트그램 모달
  const [artgramId, setArtgramId] = useState(""); //id를 넘겨주기 위한 state

  //react-query
  const { AlramInfo } = useGetAlramInfo();
  const { updateAlramInfo } = usePatchAlramInfo();
  const navigate = useNavigate();

  const seenTrueHandler = list => {
    const notiId = list.notiId;
    updateAlramInfo(notiId);
    list.seen = true;

    if (list.noti_content === "artgram") {
      const artgramId = list?.noti_content_id;
      setArtgramId(artgramId); //id 넘겨주기
      openModalhandle(artgramId);
    } else if (list.noti_content === "exhibition") {
      navigate(`/exhibition/detail/${list?.noti_content_id}`);
    }
  };

  return (
    <>
      <Style.StAlramContainer>
        <Style.StAlramTitle>
          <Style.AlramTitle>알림</Style.AlramTitle>
          <Style.StBell>
            <img src={bell} alt="bell" />
          </Style.StBell>
        </Style.StAlramTitle>
        <Style.StAlramBox>
          {AlramInfo?.map(list => {
            return (
              <Style.StAlramWrap
                style={
                  list.seen === false
                    ? { backgroundColor: "#F0F3FF" }
                    : { backgroundColor: "white" }
                }
                key={list.notiId}
                onClick={() => seenTrueHandler(list)}
              >
                {(list.noti_content === "artgram" && (
                  <div>
                    <Style.StIconWrap>
                      {(list.noti_type === "like" && (
                        <img src={likeIcon} alt="likeIcon" />
                      )) ||
                        (list.noti_type === "comment" && (
                          <img src={commentIcon} alt="commentIcon" />
                        )) ||
                        (list.noti_type === "reply" && (
                          <img src={commentIcon} alt="commentIcon" />
                        ))}
                    </Style.StIconWrap>

                    <Style.StAlramContents>
                      <div style={{ gap: "20px" }}>
                        <Style.StAlramTheme>아트그램</Style.StAlramTheme>
                        {/* <div>3일전</div> */}
                      </div>
                      <Style.StAlramContent>
                        {(list.noti_type === "like" &&
                          `${list.noti_sender_nickname} 님이 회원님의 아트그램을 좋아합니다.`) ||
                          (list.noti_type === "comment" &&
                            `${list.noti_sender_nickname} 님이 회원님의 아트그램에 댓글을 남겼습니다.`) ||
                          (list.noti_type === "reply" &&
                            `${list.noti_sender_nickname} 님이 회원님의 댓글에 답글을 남겼습니다.`)}
                      </Style.StAlramContent>
                    </Style.StAlramContents>
                  </div>
                )) ||
                  (list.noti_content === "exhibition" && (
                    <div>
                      <Style.StIconWrap>
                        {(list.noti_type === "like" && (
                          <img src={likeIcon} alt="likeIcon" />
                        )) ||
                          (list.noti_type === "comment" && (
                            <img src={commentIcon} alt="commentIcon" />
                          ))}
                      </Style.StIconWrap>

                      <Style.StAlramContents>
                        <div style={{ gap: "20px" }}>
                          <Style.StAlramTheme>전시</Style.StAlramTheme>
                        </div>
                        <Style.StAlramContent>
                          {(list.noti_type === "like" &&
                            `${list.noti_sender_nickname} 님이 회원님의 글을 좋아합니다.`) ||
                            (list.noti_type === "comment" &&
                              `${list.noti_sender_nickname} 님이 회원님의 글에 후기를 남겼습니다.`)}
                        </Style.StAlramContent>
                      </Style.StAlramContents>
                    </div>
                  ))}
              </Style.StAlramWrap>
            );
          })}
        </Style.StAlramBox>
      </Style.StAlramContainer>

      {/* 아트그램 모달 */}
      {modalState && (
        <ArtgarmDetailModal
          artgramId={artgramId}
          modalState={modalState}
          openModalhandle={openModalhandle}
        />
      )}
    </>
  );
}

export default AlarmContainer;

import React from "react";
import * as Artgramparts from "./ArtgramCss";
import ArtgramSlider from "../ArtgramSlider";
import { useGetartgramDetail } from "../../../hooks/artgram/useGetartgramDetail";
import { useGetartgramComments } from "../../../hooks/artgram/useGetartgramComments";

function ArtgarmDetailModal({ artgramId, modalState, openModalhandle }) {
  const [detailIsLoading, detailIsError, detailData] =
    useGetartgramDetail(artgramId);
  const [commentsIsLoading, commentsIsError, commentsData] =
    useGetartgramComments(artgramId);

  return (
    <>
      <Artgramparts.ModalBackground
        state={modalState}
        onClick={(e) => {
          e.stopPropagation();
          openModalhandle();
        }}
      />
      <Artgramparts.ModalWindow
        state={modalState}
        onClick={(e) => e.stopPropagation()}
      >
        {detailIsLoading ||
        detailIsError ||
        commentsIsLoading ||
        commentsIsError ? (
          <div>로딩 중...</div>
        ) : (
          <>
            <div className="artgarmDetailModalSlider">
              {detailData.ArtgramImgs.length > 1 ? (
                <div className="sliderLayout">
                  <ArtgramSlider map={detailData.ArtgramImgs} />
                </div>
              ) : (
                <img src={detailData.ArtgramImgs[0].imgUrl} width="100%" />
              )}
            </div>
            <div className="artgarmDetailModalContent">
              <div className="artgarmDetailinfo">
                <div className="profileimg" />
                <div>
                  <div>
                    <p className="profileNickname">EEEABCD</p>
                    <p className="artgarmDetailTitle">대지의 시간</p>
                    <p className="artgarmDetailDesc">
                      대지의 시간》은 기후변화와 팬데믹 등 전 지구적 위기의
                      시대를 맞이하여 새로운 시대정신으로 떠오르고 있는
                      '생태학적 세계관'을 탐색하는 장으로서, '공생', '연결',
                      '균형의 회복'을 지향하는 국내외 작가 16명의 작품과
                      아카이브를 선보인다.
                      대지의 시간》은 기후변화와 팬데믹 등 전 지구적 위기의
                      시대를 맞이하여 새로운 시대정신으로 떠오르고 있는
                      '생태학적 세계관'을 탐색하는 장으로서, '공생', '연결',
                      '균형의 회복'을 지향하는 국내외 작가 16명의 작품과
                      아카이브를 선보인다.
                      대지의 시간》은 기후변화와 팬데믹 등 전 지구적 위기의
                      시대를 맞이하여 새로운 시대정신으로 떠오르고 있는시대를 맞이하여 새로운 시대정신으로 떠오르고 있는시대를 맞이
                    </p>
                    <p className="artgarmDetailHashTag">#하하하 #크크크</p>
                  </div>
                </div>
              </div>
              <div className="artgarmcommentBox">
                {Array(12)
                  .fill(null)
                  .map((el, idx) => (
                    <div key={idx} className="artgarmcomments">
                      <div className="profileimg" />
                      <div>
                        <div className="commentWrap">
                          <div>
                            <p className="profileNickname">닉네임</p>
                            <p className="artgarmcomment">댓글내용</p>
                          </div>
                          <div>
                            <p className="artgarmcommentTime">4분전</p>
                            <p className="commentwrite">답글달기</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="commentWrite">
                <div className="scrapLiked">좋아요/스크랩</div>
                <div className="commentInput"><input placeholder="댓글입력"/></div>
              </div>
            </div>
          </>
        )}
      </Artgramparts.ModalWindow>
    </>
  );
}

export default ArtgarmDetailModal;

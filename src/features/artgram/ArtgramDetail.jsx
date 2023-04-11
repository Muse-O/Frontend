import React from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { usePostcomments } from "../../hooks/artgram/usePostcomments";
import * as Modal from "./ArtgramModal";
import { Flex } from "../../components/Flex";
import { Input } from "../../components/Input";
import * as Artgramparts from "./Artgramparts";
// import {BiDotsHorizontalRounded} from 'react-icons/bi'
import { useGetartgramComments } from "../../hooks/artgram/useGetartgramComments";
import { decodetoken } from "../../shared/cookies";
import { usePostingtime } from "../../hooks/artgram/usePostingtime";

// 이미지슬라이더를 위한 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none" }}
      onClick={onClick}
    />
  );
}


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block flex",
        background: "#fffffff6",
        position: "absolute",
        right: "10px",
        width: "50px",
        height: "50px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50px",
        color: "black",
      }}
      onClick={onClick}
    >
      <div style={{position:"relative", right:"8px"}}>
        <FaChevronRight size={24} color="#e20303" />
      </div>
    </div>
  );
}

function ArtgramDetail({pos}) {
  const { allArtgram, modalState, setModalState } = pos;
  // 아트그램 상세모달페이지: 댓글 POST 관련 --------------------------------------------------------------------------- //
  const [formState, setFormState, handleInputChange] = useFormInput();
  const [commentHandle] = usePostcomments(setFormState);
  const [isLoading, isError, data] = useGetartgramComments(
    allArtgram.artgramId
  );
  const [timehandle] = usePostingtime()  



  const settings = {
    speed: 500, // 속도조절
    // infinite:false,
    slidesToShow: 1, // 화면에 보여지는 슬라이더의 수 
    slidesToScroll: 1, // 한번에 넘길 슬라이더이더의 수 
    style:{width:"100%", position:"relative"},
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  if (isLoading || isError) {
    return <div>로딩 중....</div>;
  }
  console.log(data);
  
  return (
    <>
      {/* 상세모달페이지 바깥배경 ---------------------------------------------------------------------- */}
      <Modal.ModalBackground state={modalState} onClick={()=>setModalState(pre=>!pre)}/>
      {/* 상세모달페이지 안쪽내용 ---------------------------------------------------------------------- */}
      <Modal.ModalWindow state={modalState}>
        <Flex>
          {/* 상세모달페이지 (1) 이미지 삽입공간 --------------------------------------------------------- */}
          <Modal.ModalinnerImgDiv width="70%">
            {/* <Modal.ModdalinnerImg src={allArtgram.ArtgramImgs[0].imgUrl} /> */}
            <Slider {...settings}>
              {allArtgram.ArtgramImgs.map(img => (
                <Modal.ModdalinnerImg src={img.imgUrl} width="100"/>
              ))}
            </Slider>

          </Modal.ModalinnerImgDiv>
          {/* 상세모달페이지 (2) 텍스트 공간 ------------------------------------------------------------ */}
          <Modal.ModalinnerDiv width="30%">
            {/* 상세모달페이지 (2-1) 사용자 정보 및 모달닫기 공간 ------------------------ */}
            <Modal.ModalUsers>
              <Flex>
                <Artgramparts.ProflieBox url={allArtgram.profileImg} />
                <Artgramparts.Nickname
                  children={
                    <>
                      <span>by</span> {allArtgram.profileNickname}
                    </>
                  }
                />
                <div
                  className="options"
                  onClick={() => setModalState((pre) => !pre)}
                >
                  {/* <BiDotsHorizontalRounded /> */} 닫기
                </div>
              </Flex>
            </Modal.ModalUsers>
            {/* 상세모달페이지 (2-2) artgram Desc ------------------------------ */}
            <Modal.ModalInner>
              <div>
                <Artgramparts.ProflieBox url={allArtgram.profileImg} />
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
            <div
              style={{
                borderTop:"1px solid gray",
                maxHeight: "670px",
                overflow: "scroll",
              }}
            >
              {/* -------------------------- 댓글 map 관련 부분 */}
              {data && data.map(comment => (
                <Modal.ModalInner key={comment.commentId}>
                <div>
                  <Artgramparts.ProflieBox url={comment.profileImg} />
                </div>
                <Flex fd="column" jc="center">
                  <Flex style={{ minHeight: "40px" }} ai="center">
                    <p>{comment.profileNickname}</p>
                  </Flex>
                  <div>
                    <p>{comment.comment}</p>
                    <p>{timehandle(comment.createdAt)}</p>
                  </div>
                </Flex>
              </Modal.ModalInner>
              ))}
              {/* ---------------------------------------- */}
            </div>
            {/* 상세모달페이지 (2-4) artgram 댓글입력공간 ------------------------- */}
            <Modal.ModalCommentsBox>
              <form
                onSubmit={(e) =>
                  commentHandle(e, allArtgram.artgramId, formState.comment)
                }
              >
                <Input
                  inputProps={{
                    type: "text",
                    name: "comment",
                    value: formState["comment"] || "",
                    placeholder: "댓글 달기...",
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
  );
}

export default ArtgramDetail;

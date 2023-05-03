import styled from "styled-components";
import NoneLiked from "../../../../assets/imgs/common/heart_gray.png";
import Liked from "../../../../assets/imgs/common/heart_full.png";
import NoneScrap from "../../../../assets/imgs/common/bookmark_gray.png";
import Scrap from "../../../../assets/imgs/common/bookmark_full.png";
import Review from "../../../../assets/imgs/exhibition/sparkle_full_yellow.png";
import { usetoken } from "../../../../shared/cookies";
import { useLikeExhibition } from "../../../../hooks/exhibition/ExhibitionLikedScrap";
import { SubmitBtn } from "../../../../components/Buttons";
import { useNavigate } from "react-router-dom";

export const Post = ({ info, id, reviewRef }) => {
  const { decodetoken } = usetoken();
  const navigator = useNavigate();
  const userEmail = decodetoken?.email;
  const [LikeScrapExhibition] = useLikeExhibition(id);
  const likeScrapHandler = (LikeOrScrap) => {
    if (!decodetoken) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
    LikeScrapExhibition(LikeOrScrap);
  };
  return (
    <PostWrap>
      <Posts>
        <PostImg src={info.postImage} />
        <EXButtons>
          <ExBtn onClick={() => likeScrapHandler("like")}>
            {info.liked === 0 ? (
              <PostsBtnImg src={NoneLiked} />
            ) : (
              <PostsBtnImg src={Liked} />
            )}
            <Detailspan>좋아요</Detailspan>
          </ExBtn>
          <ExBtn iscenter={true} onClick={() => likeScrapHandler("scrap")}>
            {info.scraped === 0 ? (
              <PostsBtnImg src={NoneScrap} />
            ) : (
              <PostsBtnImg src={Scrap} />
            )}
            <Detailspan>스크랩</Detailspan>
          </ExBtn>
          <ExBtn>
            <PostsBtnImg src={Review} />
            <Detailspan>
              평점
              {info.reviewStatus[0].reviewAvgRating
                ? info.reviewStatus[0].reviewAvgRating.slice(0, 3)
                : 0}
            </Detailspan>
          </ExBtn>
        </EXButtons>
        <SubmitBtns>
          {info.userEmail === userEmail ? (
            <SubmitBtn
              onClick={() =>
                navigator(`/exhibition/update/${info.exhibitionId}`)
              }
            >
              수정하기
            </SubmitBtn>
          ) : (
            <SubmitBtn onClick={() => reviewRef.current.focus()}>
              후기 작성
            </SubmitBtn>
          )}
          <SubmitBtn onClick={() => navigator(`/exhibition`)}>
            목록으로
          </SubmitBtn>
        </SubmitBtns>
      </Posts>
    </PostWrap>
  );
};
const PostsBtnImg = styled.img`
  width: 23px;
  height: 23px;
`;
const Detailspan = styled.span`
  background-color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;

//!중복
const SubmitBtns = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  padding: 36px 0px;
`;

const EXstatusTitle = styled.div`
  color: #ffffff;
  padding-left: 16px;
  margin-left: 16px;
  border-left: 1px solid #ffffff;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;
const Icon = styled.div`
  padding: auto;
  font-size: 20px;
`;
const ExBtn = styled.div`
  gap: 12px;
  padding: 22px 38px;
  display: flex;
  align-items: center;
  flex: 1;
  border-width: ${(props) => props.iscenter && `0px 1px 0px 1px`};
  border-style: solid;
  border-color: #000000;
  :hover {
    cursor: pointer;
  }
`;
const ArtLinkBtn = styled.button`
  background-color: white;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;

const Posts = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  align-items: center;
`;
const EXButtons = styled.div`
  width: 493px;
  height: 75px;
  display: flex;
  border-width: 1px 0px 1px 0px;
  padding: 6px 0px;
  border-style: solid;
  border-color: #000000;
  justify-content: space-around;
  margin-top: 15px;
`;
const DIV = styled.div`
  background-color: aqua;
  margin-top: 50px;
`;

const SecondTitle = styled.div`
  margin-left: 648px;
  margin-top: 12px;
  height: 39px;
`;

const SecondTitleH2 = styled.h2`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #cecece;
`;

const PostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 648px;
`;
const PostImg = styled.img`
  max-height: 704px;
  max-width: 425px;
  margin-top: 58px;
`;

const BlackBg = styled.div`
  position: fixed;
  background-color: #1b1917;
  height: 328px;
  width: 1675px;
  z-index: 5;
`;

const Date = styled.div`
  display: flex;
  margin-left: 648px;
  margin-top: 60px;
`;

const Title = styled.div`
  margin-left: 648px;
  margin-top: 56px;
`;

const TitleH1 = styled.h1`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 59px;
  letter-spacing: -0.038em;
  color: #ffffff;
`;

const DateP = styled.p`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
`;

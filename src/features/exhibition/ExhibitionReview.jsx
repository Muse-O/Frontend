import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { usePostReview } from "../../hooks/exhibition/usePostReview";
import { useParams } from "react-router-dom";
import { useGetReview } from "../../hooks/exhibition/useGetReview";
import { apis } from "../../api/apis";
import jwtDecode from "jwt-decode";
import { cookies } from "../../shared/cookies";

function ExhibitionReview() {
  const access_token = cookies.get("access_token");
  const { email } = jwtDecode(access_token);
  console.log("test@test.com", email);

  //TODO 리뷰 조회
  //TODO 리뷰 작성
  //TODO 리뷰 삭제
  //TODO 리뷰 수정
  const { id } = useParams();
  const [createExhibition] = usePostReview(id);
  const template = {
    reviewComment: "",
    reviewRating: 0,
  };
  const [postReview, setPostReviews] = useState(template);
  const [hashTag, setHashTags] = useState([]);
  const [inputHashTag, setInputHashTag] = useState("");
  const reviewHandler = (event) => {
    const { value, name } = event.target;
    if (name === "reviewRating") {
      setPostReviews((pre) => {
        return {
          ...pre,
          [name]: Number(value),
        };
      });
    } else {
      setPostReviews((pre) => {
        return {
          ...pre,
          [name]: value,
        };
      });
    }
  };
  const hashTaghandler = (e) => {
    const { value } = e.target;
    setInputHashTag(value);
  };

  const upKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      let updatedHash = [...hashTag];
      updatedHash.push(`#${inputHashTag}`);
      setHashTags(updatedHash);
      setInputHashTag("");
    }
  };
  //제출하기
  const onSubmitReview = (e) => {
    e.preventDefault();
    createExhibition({ hashTag, ...postReview });
    console.log("탬플릿", template);
    setPostReviews(template);
    setInputHashTag("");
    setHashTags([]);
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!리뷰들
  const [getReviews, setGetReviews] = useState([]);
  const [page, setPage] = useState(10);
  const [limit, setLimit] = useState(10);
  const [pageNumbers, setPageNumbers] = useState(0);
  const readReviews = useCallback(
    async (id, limit, page) => {
      const res = await apis.get(
        `/exhibition/${id}/reviews?limit=${limit}&offset=${page}`
      );
      if (res.data) {
        setGetReviews([
          ...res.data.exhibitionReviewList.searchExhibitionReviews,
        ]);
      } else {
        console.log(res);
      }
    },
    [id, limit, page]
  );
  useEffect(() => {
    readReviews(id, limit, page);
  }, []);
  console.log("받아온getRevies", getReviews);
  console.log("postReview", postReview);
  return (
    <ReviewWrap>
      <ReviewForm>
        <InputsReview>
          <input
            placeholder="리뷰 입력"
            onChange={reviewHandler}
            value={postReview.reviewComment}
            name="reviewComment"
          />
          <input
            placeholder="해시태그 입력"
            value={inputHashTag}
            onChange={hashTaghandler}
            onKeyPress={upKeyPress}
            name="hashTag"
          />
          <div>
            {hashTag &&
              hashTag.map((hashTag, index) => {
                return <span key={index}>{hashTag}</span>;
              })}
          </div>
        </InputsReview>
        <select
          onChange={reviewHandler}
          name="reviewRating"
          value={postReview.reviewRating}
        >
          <option>평점입력</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={onSubmitReview}>리뷰 추가</button>
      </ReviewForm>
      <ShowReview>
        {getReviews?.map((review) => {
          return (
            <>
              <ReviewBox>
                <div>작성일:{review.createdAt}</div>
                <div>후기:{review.reviewComment}</div>
                <div>평점:{review.reviewRating}</div>
                <div>
                  헤시테그:
                  {review.ExhibitionHashtags.map((hashtag) => {
                    return (
                      <>
                        <span>{hashtag.tagName}</span>
                      </>
                    );
                  })}
                </div>
                {review.userEmail === email ? <button>수정하기</button> : null}
              </ReviewBox>
            </>
          );
        })}

        {/* {pages?.map((page) => {
          return (
            <Coments>
              <div>
                <span>후기:</span> {page.reviewComment}
              </div>
              <div>
                <span>평점:</span> {page.reviewRating}
              </div>
            </Coments>
          );
        })} */}
        <Buttons>
          {Array(pageNumbers)
            .fill()
            .map((_, i) => (
              <button key={i + 1}>{i + 1}</button>
            ))}
        </Buttons>
      </ShowReview>
    </ReviewWrap>
  );
}

export default ExhibitionReview;

const ReviewBox = styled.div`
  margin: 10px 0px;
  background-color: #849ff7;
  height: 100px;
  font-size: 30px;
`;
const Buttons = styled.span`
  margin: 10px 10px;
  background-color: #f3c385;
`;
const Coments = styled.div`
  margin: 10px;
  background-color: antiquewhite;
`;
const ShowReview = styled.div`
  background-color: #525050;
`;

const InputsReview = styled.div`
  width: 694px;
  height: 115px;
`;

const ReviewForm = styled.div`
  background-color: #ebbaba;
  display: flex;
  height: 120px;
`;
const ReviewWrap = styled.div`
  background-color: #a8a5a5;
  height: 600px;
  margin-bottom: 100px;
`;

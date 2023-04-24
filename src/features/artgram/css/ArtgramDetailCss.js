import styled from "styled-components";

const CommentBox = styled.div`
  display:grid;
  grid-template-columns:33px 1fr;
  margin-bottom:10px;
  gap:5px;
`

const CommentBoxProfileImg = styled.div`
  background-color:lightgray;
  background-image: url(${pos => pos.img});
  background-position: center;
  background-size: cover;
  width:33px;
  height:33px;
  border-radius:50px;
`

const CommentBoxInnerText = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  /* background-color:yellow; */
`

const ProfileNickNameComments = styled.div`
  .profileNickname{
    font-family: "Montserrat";
    font-weight:550;
    font-size: 12px;
  }
  .comments {
    margin-left:8px;
    font-size:12px;
    line-height:20px;
  }
  .commentsUpdateForm {
    display: inline-block;
    margin-left:8px;
    font-size:12px;
    height:20px;

    input {
    width: 430px;
    border: 2px solid orange;
    border-radius: 15px;
    font-size: 13px;
    padding-left: 4px;
      :focus {
        outline: none;
      }
      ::placeholder {
        font-size: 10px; /* 원하는 글자 크기 설정 */
      }
    }
  }
`

export {
  CommentBox,
  CommentBoxProfileImg,
  CommentBoxInnerText,
  ProfileNickNameComments
}
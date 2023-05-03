import styled from "styled-components";

const CommentBox = styled.div`
  display:grid;
  grid-template-columns:33px 1fr;
  margin-bottom:10px;
  gap:5px;
  @media (max-width: 1440px) {
    grid-template-columns:24.75px 1fr;
    margin-bottom:7.5px;
    gap:3.75px;
  }
`

const CommentBoxProfileImg = styled.div`
  background-color:lightgray;
  background-image: url(${pos => pos.img});
  background-position: center;
  background-size: cover;
  width:33px;
  height:33px;
  border-radius:50px;
  @media (max-width: 1440px) {
    width:24.75px;
    height:24.75px;
  }
`

const CommentBoxInnerText = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  /* background-color:yellow; */
  .profileNickname {
    margin-right: 4px;
    font-family: "Montserrat";
    font-weight:550;
  }
`

const ProfileNickNameComments = styled.div`
  .profileNickname{
    font-family: "Montserrat";
    font-weight:550;
    font-size: 12px;
    @media (max-width: 1440px) {
      font-size: 9px;
    }
  }
  .comments {
    margin-left:8px;
    font-size:12px;
    line-height:20px;
    @media (max-width: 1440px) {
      margin-left:6px;
      font-size:9px;
      line-height:15px;
    }
  }
  .commentsUpdateForm {
    display: inline-block;
    margin-left:8px;
    font-size:12px;
    height:20px;
    @media (max-width: 1440px) {
      margin-left:6px;
      font-size:9px;
      line-height:15px;
    }

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
      @media (max-width: 1440px) {
        width: 322.5px;
        border: 1.5px solid orange;
        border-radius: 11.25px;
        font-size: 9.75px;
        padding-left: 3px;
      }
    }
  }
`

const CommentsInput = styled.input`
  width: 300px;
  padding: 2px 3px;
  border-bottom: 1px solid;
  :focus {
        outline: none;
  }
  @media (max-width: 1440px) {
    width : 225px
  }
`

const CommentsInputBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top:${props=>props.top19 ? props.top19 : null};
  right: ${props=>props.right19 ? props.right19 : null};
  bottom: ${props=>props.bottom19 ? props.bottom19 : null};
  background-color: #EEEEEE;
  width: 40px;
  height: ${props=>props.height19 ? props.height19 : "20px"};
  border-radius: 8px;
  font-style: 12px;
  font-weight: 500;
  &:hover {
    background-color: #242424;
    color: #fff;
  }
  @media (max-width: 1440px) {
    width: 30px;
    height: ${props=>props.height14 ? props.height14 : "15px"};
    border-radius: 6px;
    font-style: 9px;
    font-weight: 500;
    top:${props=>props.top14 ? props.top14 : null};
    right: ${props=>props.right14 ? props.right14 : null};
    bottom: ${props=>props.bottom14 ? props.bottom14 : null};
  }

`

export {
  CommentBox,
  CommentBoxProfileImg,
  CommentBoxInnerText,
  ProfileNickNameComments,
  CommentsInput,
  CommentsInputBtn
}
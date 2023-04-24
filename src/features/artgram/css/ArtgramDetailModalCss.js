import styled from "styled-components";

const SliderOutline = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px 0 0 15px;
  background-color: #eeeeee;
  overflow: hidden;

  .sliderLayout {
    width: 635px;
  }
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 0 15px 15px 0;
  max-height: 894px;
`;

const ContentInnerText = styled.div`
  padding: 30px 24px 0;
  display: grid;
  max-height: 268px;
  min-height: 268px;
  grid-template-columns: 33px 1fr;
  border-bottom: 1px solid #dddddd;
  gap: 16px;
  /* background-color: lightcoral; */

  .profileimg {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background-color: lightgray;
  }
  .profileNickname {
    font-family: "Montserrat";
    font-size: 12px;
    margin-bottom: 8px;
  }
  .artgarmDetailTitle {
    font-size: 12px;
    color: #ababab;
  }
  .artgarmDetailDesc {
    margin-top: 32px;
    font-size: 12px;
    color: #434343;
    line-height: 20px;
  }
  .artgarmDetailHashTag {
    margin-top: 28px;
    font-size: 11px;

    // 글자에 그라데이션 효과를 주는 방법 가운데 하나로, 배경화면에 색을 주입하고, 이를 글자의 색상에 첨부하는 방식이 활용될 수 있다.
    /* background: linear-gradient(to bottom, #3360ff 0%, #b960ff 40%);
    background-clip: text; */
    color: blue;
    font-weight: 600;
  }
`;

const CommentsLayout = styled.div`
  max-height: 458px;
  height: 458px;
  padding: 24px;
  overflow: scroll;

  .artgarmcomments {
    padding: 24px 24px 0;
    display: grid;
    grid-template-columns: 33px 1fr;
    gap: 16px;
    /* background-color: lightcoral; */

    .profileimg {
      width: 33px;
      height: 33px;
      border-radius: 50%;
      background-color: lightgray;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
  }
`;

const CommentsInnerText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  div {
    display: flex;
    align-items: center;
  }

  .profileNickname {
    font-family: "Montserrat";
    font-size: 12px;
  }
  .artgarmcomment {
    flex-grow: 1;
    font-size: 13px;
    color: #858585;
    min-height: 20px;
    text-align: justify;
  }

  input {
    width: 420px;
    border: 2px solid orange;
    border-radius: 15px;
    font-size: 13px;
    padding: 0 12px;
    :focus {
      outline: none;
    }
  }
`;

const CommentsSettings = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 40px;
  /* margin-bottom: 8px; */

  .artgarmcommentTime {
    font-size: 12px;
    color: #ababab;
    
  }
  .commentwrite {
    font-size: 12px;
    color: #ababab;
  }
`;

const Reply = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 58px 1fr;
  gap: 16px;

  hr {
    border: 0.1px solid #7E7E7E;
  }
`

const CommentWriteLayout = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 168px;
  border-radius: 0 0 15px 0;
  /* background: #EAEAEA; */
  background: #f7f7f9;
  overflow: hidden;

  .scrapLiked {
    height: 113px;
  }

  .commentInput {
    border-top: 1px solid #ffffff;
    input {
      display: block;
      width: 100%;
      font-size: 15px;
      background: #f7f7f9;
      padding: 16px 24px;
      border: none;
      ::placeholder {
        color: #7e7e7e;
      }
      :focus {
        outline: none;
      }
    }
  }
`;

const ContentSetting = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 20px;
  height: 20px;
  font-family:  Montserrat;
`

const ContentSettingBoxLayout = styled.div`
  position: absolute;
  top: 60px;
  right: 30px;
  width: 135px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
  box-shadow:  0px 4px 4px rgba(0, 0, 0, 0.25);
`

const SettingBtn = styled.div`
  text-align: center;
  line-height: 32px;
  font-size: 12px;
`

const SettingBtnborderline = styled(SettingBtn)`
  border-bottom: 1px solid gray;
`



export {
  // 좌측 슬라이더 부분
  SliderOutline,
  // 우측 컨텐츠 부분
  ModalContent,
  ContentInnerText,
  ContentSetting,
  CommentsLayout,
  CommentsInnerText,
  CommentsSettings,
  Reply,
  CommentWriteLayout,
  // ContentSetting 관련
  ContentSettingBoxLayout,
  SettingBtn,
  SettingBtnborderline
};

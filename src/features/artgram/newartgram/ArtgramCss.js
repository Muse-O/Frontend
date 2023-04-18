import styled from "styled-components";

const Layout = styled.div`
  padding: 80px 75px;
`
const H1 = styled.h1`
  font-size: 48px;
  font-family: 'S-CoreDream-3Light';

  span {
    font-family: 'Montserrat';
    font-size: 32px;
  }
`

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 23px;
  width: 100%;
  margin-top: 60px;
`;

const HiddenRef = styled.div`
  margin-top: 10px;
  color: transparent;
`

const ArtgramboxWrap = styled.div`
  position: relative;
  height: 426px;
  box-shadow: 0px 4px 7px #878787;
  border-radius: 5px;
  background-color: #efefef;

  .imgWrap {
    position: relative;
    max-width: 364px;
    min-height: 365px;
    max-height: 365px;
    overflow: hidden;
  }

  .artgramimg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 354px;
    border-radius: 5px 5px 0 0;
    background-color: lightgreen;
  }

  .artgraminfo {
    display: grid;
    grid-template-columns: 29px 1fr 47px 47px;
    gap: 8px;
    height: 61px;
    padding: 16px 12px;
    align-items: center;
  }

  .artgramProfileImg {
    width: 29px;
    height: 29px;
    border-radius: 50px;
    background-color: lightgray;

    img {
      display: block;
      width: 100%;
      border-radius: 50px;
    }
  }

  .artgramProfileNickname {
    font-family: "Montserrat";
    font-size: 12px;
    font-weight: 600;
    span {
      font-weight: 400;
      color: #767676;
    }
  }
`;

const Scrap = styled.div`
  font-family: "Montserrat";
  font-size: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  p:first-child {
    font-size: 16px;
    color: ${(props) => (props.state ? "#4FC0E8" : "lightgray")};
    position: relative;
    top: 2px;
  }
`;

const Heart = styled(Scrap)`
  p:first-child {
    color: ${(props) => (props.state ? "#E84FC0" : "lightgray")};
  }
`;

const PluralImgs = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border-radius: 5px;
  background: #DDDDDD;
  opacity: 0.8;
  p {
    font-size: 2rem;
  }
`
const ModalBackground = styled.div`
  display: ${props => props.state ? "block" : "none"};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: ; */
  background-color: rgba(35, 35, 35, 0.7);
  z-index: 10200;
`

const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 57%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.state ? "grid" : "none")};
  grid-template-columns: repeat(2, 1fr);
  width: 1264px;
  height: 894px;
  background-color: #f2f2f2;
  border-radius: 15px;
  z-index: 10200;

  .artgarmDetailModalSlider {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px 0 0 15px;

    .sliderLayout {
      width: 635px;
    }
  }

  .artgarmDetailModalContent {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 0 15px 15px 0;
    max-height: 894px;
  }

  .artgarmDetailinfo {
    padding: 30px 24px 0;
    display: grid;
    max-height: 268px;
    min-height: 268px;
    grid-template-columns: 33px 1fr;
    gap: 16px;
    background-color: lightcoral;

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
      color: #2b99ff;
    }
  }

  .artgarmcommentBox {
    max-height: 458px;
    height: 458px;
    overflow: scroll;
  }

  .artgarmcomments {
    padding: 24px 24px 0;
    display: grid;
    max-height: 100px;
    grid-template-columns: 33px 1fr;
    gap: 16px;
    /* background-color: lightcoral; */

    .profileimg {
      width: 33px;
      height: 33px;
      border-radius: 50%;
      background-color: lightgray;
    }
    .commentWrap {
      div:first-child {
        display: flex;
        gap: 8px;

        .profileNickname {
          font-family: "Montserrat";
          font-size: 12px;
        }
        .artgarmcomment {
          display: flex;
          flex-grow: 1;
          font-size: 13px;
          color: #858585;
        }
      }
      div:last-child {
        margin-top: 8px;
        display: flex;
        gap: 16px;

        .artgarmcommentTime {
          font-size: 12px;
          color: #ABABAB;
        }
        .commentwrite {
          font-size: 12px;
          color: #ABABAB;
        }
      }
    }
  }
  .commentWrite {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 168px;
    border-radius: 0 0 15px 15px;
    background: #B9B9B9;
    overflow: hidden;

    .scrapLiked {
      height: 113px;
    }

    .commentInput {
      border-top: 1px solid #FFFFFF;;
      input {
      display: block;
       width: 100%;
       font-size: 15px;
       background: #B9B9B9;
       padding: 16px 24px;
       ::placeholder {
          color: white;
        }
      :focus {
        outline: none;
      }  
      }
    }
  }
`;



export {
  // 아트그램 Main
  Layout,
  H1,
  Wrap,
  HiddenRef,

  // 아트그램 Box
  ArtgramboxWrap,
  Scrap,
  Heart,
  PluralImgs,

  // 아트그램 DetailModal
  ModalBackground,
  ModalWindow,
}
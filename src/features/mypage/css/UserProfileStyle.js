import styled from "styled-components";

const StUserProfileBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 430px;
  height: 822px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 74px;
  margin-left: 20px;

  @media (max-width: 1440px) {
    width: 322.5px;
    height: 616.5px;
    margin-top: 55.5px;
    margin-left: 15px;
  }
`;

const StEditBtnWrap = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px 20px 0px;
  position: relative;

  @media (max-width: 1440px) {
    width: 337.5px;
    padding: 7.5px 15px 0px;
  }
`;

const UpdateBtn = styled.button`
  background-color: white;
  width: 41px;
  height: 41px;
  border-radius: 50%;
  cursor: pointer;

  img {
    width: 25px;
    height: 25px;

    @media (max-width: 1440px) {
      width: 18.75px;
      height: 18.75px;
    }
  }

  @media (max-width: 1440px) {
    width: 30.75px;
    height: 30.75px;
  }
`;

const StSettingBtn = styled.div`
  margin-top: 40px;
  position: absolute;
  width: 135px;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1440px) {
    margin-top: 30px;
    width: 101.25px;
    height: 48px;
  }

  div {
    font-family: "SpoqaHanSansNeo-Regular";
    font-size: 12px;
    color: #3c3c3c;
    width: 135px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    border-bottom: 1px solid #dddddd;

    @media (max-width: 1440px) {
      font-size: 9px;
      color: #3c3c3c;
      width: 101.25px;
      height: 24px;
    }

    &:hover {
      background-color: #3c3c3c;
      color: #f65959;
    }
  }

  button {
    border: none;
    background-color: inherit;
    font-family: "SpoqaHanSansNeo-Regular";
    font-size: 12px;
    color: #3c3c3c;
    width: 135px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;

    @media (max-width: 1440px) {
      font-size: 9px;
      width: 101.25px;
      height: 24px;
    }

    button:disabled {
      cursor: default;
      background-color: "#EEEEEE";
      color: "#7E7E7E";
    }

    &:hover:not(:disabled) {
      background-color: #3c3c3c;
      color: #f65959;
    }
  }
`;

const StUserNameWrap = styled.div`
  width: 400px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 42px;
  gap: 8px;

  @media (max-width: 1440px) {
    width: 300px;
    height: 21px;
    margin-top: 31.5px;
    gap: 6px;
  }
`;

const StInfoUserName = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 32px;
  font-weight: 600;

  @media (max-width: 1440px) {
    font-size: 24px;
  }
`;

const StArtistMark = styled.div`
  /* background-color: #808080bd; */
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1440px) {
    width: 21px;
    height: 21px;
  }

  img {
    width: 25px;
    height: 25px;

    @media (max-width: 1440px) {
      width: 18.75px;
      height: 18.75px;
    }
  }
`;

const StUserInfoIntro = styled.div`
  font-size: 16px;
  height: 90px;
  width: 250px;
  margin-top: 35px;

  @media (max-width: 1440px) {
    font-size: 12px;
    height: 67.5px;
    width: 187.5px;
    margin-top: 26.25px;
  }
`;

const InfoIntro = styled.div`
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 16px;
  color: #3c3c3c;
  line-height: 25px;
  word-break: break-all;
  text-align: center;

  @media (max-width: 1440px) {
    font-size: 12px;
  }
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transform: translate(0%, -50%);
  position: absolute;

  @media (max-width: 1440px) {
    width: 112.5px;
    height: 112.5px;
    transform: translate(0%, -50%);
  }
`;

const Line = styled.div`
  border-top: 1px solid #cccccc;
  width: 392px;
  height: 32px;

  @media (max-width: 1440px) {
    width: 294px;
    height: 24px;
  }
`;

export {
  StUserProfileBox,
  StEditBtnWrap,
  UpdateBtn,
  StSettingBtn,
  StUserNameWrap,
  StInfoUserName,
  StArtistMark,
  StUserInfoIntro,
  InfoIntro,
  ProfileImg,
  Line,
};

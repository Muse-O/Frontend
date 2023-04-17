import React, { useState } from "react";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import UpdateModalBlackBg from "./UpdateModalBlackBg";
import styled from "styled-components";
import AlarmContainer from "./AlarmContainer";
import { AiOutlineSetting } from "react-icons/ai";

function UserProfile() {
  const { userProfile } = useGetUserProfile();
  //모달 open 관리
  const [openModal, setOpenModal] = useState(false);

  const updateUserProfileModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <StUserProfileBox>
        <ProfileImg src={userProfile?.profileImg} alt="userProfileImg" />

        <StEditBtnWrap>
          <UpdateBtn onClick={updateUserProfileModalHandler}>
            <AiOutlineSetting size="30" />
          </UpdateBtn>
        </StEditBtnWrap>

        <StUserNameWrap>
          <StInfoUserName>{userProfile?.nickname}</StInfoUserName>
          <StArtistMark></StArtistMark>
        </StUserNameWrap>

        <StUserInfoIntro>
          <InfoIntro>{userProfile?.introduction}</InfoIntro>
        </StUserInfoIntro>

        <Line></Line>

        <AlarmContainer />
      </StUserProfileBox>

      {/* 유저 프로필 수정을 위한 모달 open */}
      {openModal && <UpdateUserProfileModal setOpenModal={setOpenModal} />}
      {/* 모달 열림과 동시에 어두운 백그라운드 넣어주고 어두운 부분 클릭시 모달 닫힘 */}
      {openModal && <UpdateModalBlackBg setOpenModal={setOpenModal} />}
    </>
  );
}

export default UserProfile;

const StUserProfileBox = styled.div`
  background-color: #80808029;
  width: 430px;
  height: 822px;
  /* height: 816px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 74px;
`;

const StEditBtnWrap = styled.div`
  width: 450px;
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px 0px;
`;

const UpdateBtn = styled.button`
  background-color: white;
  width: 41px;
  height: 41px;
  border-radius: 50%;
  cursor: pointer;
`;

const StUserNameWrap = styled.div`
  width: 300px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 42px;
  gap: 8px;
`;

const StInfoUserName = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const StArtistMark = styled.div`
  background-color: gray;
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

const StUserInfoIntro = styled.div`
  font-size: 16px;
  height: 90px;
  width: 250px;
  margin-top: 35px;
`;
const InfoIntro = styled.div`
  font-size: 15px;
  line-height: 25px;
  word-break: break-all;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transform: translate(0%, -50%);
  position: absolute;
`;

const Line = styled.div`
  border-top: 1px solid white;
  width: 393px;
  height: 20px;
`;

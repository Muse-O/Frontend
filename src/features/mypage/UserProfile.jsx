import React, { useState } from "react";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import UpdateModalBlackBg from "./UpdateModalBlackBg";
import styled from "styled-components";
import AlarmContainer from "./AlarmContainer";

function UserProfile() {
  const { userProfile } = useGetUserProfile();
  //모달 open 관리
  const [openModal, setOpenModal] = useState(false);

  const updateUserProfileModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <StUserProfileBox fd="column">
        <ProfileImg src={userProfile?.profileImg} alt="userProfileImg" />
        <StEditBtnWrap>
          <UpdateBtn onClick={updateUserProfileModalHandler}>수정</UpdateBtn>
        </StEditBtnWrap>

        <StInfoWrap>
          <InfoUserName>{userProfile?.nickname}</InfoUserName>
          <InfoIntro>{userProfile?.introduction}</InfoIntro>
        </StInfoWrap>

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
  background-color: #ffc0cb56;
  width: 440px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const StEditBtnWrap = styled.div`
  width: 450px;
  display: flex;
  justify-content: flex-end;
  padding: 30px 15px;
`;

const UpdateBtn = styled.button`
  background-color: #80808058;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const StInfoWrap = styled.div`
  width: 300px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffff0024;
`;

const InfoUserName = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
`;

const InfoIntro = styled.div`
  font-size: 15px;
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
  width: 400px;
  height: 20px;
`;

import React, { useState } from "react";
import { Flex } from "./../../components/Flex";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import UpdateModalBlackBg from "./UpdateModalBlackBg";
import styled from "styled-components";
import { Link } from "react-router-dom";

function UserProfile() {
  const { userProfile } = useGetUserProfile();
  //모달 open 관리
  const [openModal, setOpenModal] = useState(false);

  const updateUserProfileModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Flex gap="10">
        <UserInfoContainer>
          <StUserProfileBox fd="column">
            <ProfileImg src={userProfile?.profileImg} alt="userProfileImg" />
            <div>
              <div>닉네임: {userProfile?.nickname}</div>
              <div>한줄 소개: {userProfile?.introduction}</div>
              <UpdateBtn onClick={updateUserProfileModalHandler}>
                수정하기
              </UpdateBtn>
            </div>
          </StUserProfileBox>

          <StAlarmBox>알림기능?</StAlarmBox>
        </UserInfoContainer>

        <PostContainer>
          <div>
            <div>전시 Exhibition</div>
            <StExhibitionBox></StExhibitionBox>
          </div>

          <div>
            <div>아트그램 Artgram</div>
            <StArtgramBox></StArtgramBox>
          </div>
        </PostContainer>
      </Flex>
      {/* 유저 프로필 수정을 위한 모달 open */}
      {openModal && <UpdateUserProfileModal setOpenModal={setOpenModal} />}
      {/* 모달 열림과 동시에 어두운 백그라운드 넣어주고 어두운 부분 클릭시 모달 닫힘 */}
      {openModal && <UpdateModalBlackBg setOpenModal={setOpenModal} />}
    </>
  );
}

export default UserProfile;

const UserInfoContainer = styled.div`
  width: 450px;
  height: 900px;
  background-color: #0077ff36;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const StUserProfileBox = styled.div`
  background-color: pink;
  width: 350px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const PostContainer = styled.div`
  background-color: #0077ff36;
  width: 1200px;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const StAlarmBox = styled.div`
  background-color: pink;
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const StExhibitionBox = styled.div`
  background-color: pink;
  width: 1100px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const StArtgramBox = styled.div`
  background-color: pink;
  width: 1100px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const UpdateBtn = styled.button`
  width: 100px;
`;

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transform: translate(0%, -50%);
`;

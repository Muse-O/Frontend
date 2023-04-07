import React, { useState } from "react";
import { Flex } from "./../../components/Flex";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import UpdateModalBlackBg from "./UpdateModalBlackBg";
import styled from "styled-components";

function UserProfile() {
  const { userProfile } = useGetUserProfile();
  //모달 open 관리
  const [openModal, setOpenModal] = useState(false);

  const updateUserProfileModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Flex fd="column">
        <div>이미지, 닉네임, 소개 GET</div>
        {/* 닉네임, 한줄소개 response 이름 변경되면 보일것임!! */}
        <div>프로필이미지: {userProfile?.profileImg}</div>
        <div>닉네임: {userProfile?.nickname}</div>
        <div>한줄 소개: {userProfile?.introduction}</div>
        <UpdateBtn onClick={updateUserProfileModalHandler}>수정하기</UpdateBtn>
      </Flex>

      {/* 유저 프로필 수정을 위한 모달 open */}
      {openModal && <UpdateUserProfileModal setOpenModal={setOpenModal} />}
      {/* 모달 열림과 동시에 어두운 백그라운드 넣어주고 어두운 부분 클릭시 모달 닫힘 */}
      {openModal && <UpdateModalBlackBg setOpenModal={setOpenModal} />}
    </>
  );
}

export default UserProfile;

const UpdateBtn = styled.button`
  width: 100px;
`;

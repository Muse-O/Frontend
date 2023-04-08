import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import { useUpdateUserProfile } from "../../hooks/mypage/useUpdateUserProfile";

function UpdateUserProfileModal({ setOpenModal }) {
  //모달 open 관리
  const updateModalCloseHandler = () => {
    setOpenModal(false);
  };

  //react-query
  const { userProfile } = useGetUserProfile(); //get
  const { updateUserProfile } = useUpdateUserProfile(); //update

  //기존에 저장돼있던 input값 보여주기
  const [editProfile, setEditProfile] = useState({
    profileImg: userProfile?.profileImg,
    nickname: userProfile?.nickname,
    introduction: userProfile?.introduction,
  });

  const changeInputHandler = event => {
    const { value, name } = event.target;
    setEditProfile(pre => ({ ...pre, [name]: value }));
  };

  //수정하기 버튼 클릭시 editProfile이 updateUserProfile에 담겨감
  const updateUserProfileHandler = e => {
    e.preventDefault();
    updateUserProfile(editProfile);
    setOpenModal(false); //이게 여기 들어가는게 맞나...
  };

  return (
    <StUserProfileModal>
      <div>수정하기</div>
      <button onClick={updateModalCloseHandler}>닫기</button>

      <div>
        <label>프로필 이미지</label>
        <img
          name="profileImg"
          src={editProfile.profileImg}
          alt="userProfileImg"
          onChange={changeInputHandler}
        />
      </div>

      <div>
        <label>닉네임</label>
        <input
          name="nickname"
          value={editProfile.nickname}
          onChange={changeInputHandler}
        />
      </div>

      <div>
        <label>한 줄 소개</label>
        <input
          name="introduction"
          value={editProfile.introduction}
          onChange={changeInputHandler}
        />
      </div>

      <button onClick={updateUserProfileHandler}>수정하기</button>
    </StUserProfileModal>
  );
}

export default UpdateUserProfileModal;

const StUserProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 800px;
  background-color: white;
  position: fixed;
  z-index: 2;
  top: 8%;
  left: 25%;
  gap: 10px;

  input {
    background-color: wheat;
  }
`;

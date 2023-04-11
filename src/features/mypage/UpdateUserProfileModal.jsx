import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import { useUpdateUserProfile } from "../../hooks/mypage/useUpdateUserProfile";
import { AiOutlineCamera } from "react-icons/ai";
import { useGetimgurl } from "../../hooks/mypage/useGetImgUrl";

function UpdateUserProfileModal({ setOpenModal }) {
  /**
   * 모달 open 관리
   */
  const updateModalCloseHandler = () => {
    setOpenModal(false);
  };

  //react-query
  const { userProfile } = useGetUserProfile(); //get
  const { updateUserProfile } = useUpdateUserProfile(); //update

  //이미지 파일을 가져오기 위한 useRef
  const fileRef = useRef(null);

  //이미지 미리보기를 위한 state
  const [image, setImage] = useState("");

  //기존에 저장돼있던 input값 보여주기
  const [editProfile, setEditProfile] = useState({
    profileImg: userProfile?.profileImg,
    nickname: userProfile?.nickname,
    introduction: userProfile?.introduction,
  });

  //setEditProfile에 name: value 형식으로 input값 넣기(nickname, introduction)
  const changeInputHandler = event => {
    const { value, name } = event.target;
    setEditProfile(pre => ({ ...pre, [name]: value }));
  };

  //수정하기 버튼 클릭시 editProfile이 updateUserProfile에 담겨감
  const [s3imgurlhandle] = useGetimgurl();
  const updateUserProfileHandler = e => {
    e.preventDefault();
    //update query에 payload로 넣어줄 fileImg = useRef 사용해서 받아둔 파일
    const fileImg = s3imgurlhandle(fileRef.current.files[0]);
    // console.log(fileImg, "img"); //파일 확인
    updateUserProfile({ ...editProfile, profileImg: fileImg });
    setOpenModal(false);
  };

  const imgUpdateHandler = () => {
    fileRef.current.click();
  };

  /**
   * 이미지를 선택하고 선택한 이미지를 미리보여주는 로직
   */
  const changeImageHandler = () => {
    let fileReader = new FileReader();
    let previewImg = fileRef.current.files[0];
    setImage(previewImg);
    fileReader.readAsDataURL(previewImg);
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
  };
  return (
    <StUserProfileModal>
      <button onClick={updateModalCloseHandler}>닫기</button>

      <StImgBox>
        <ProfileImg
          name="profileImg"
          src={image === "" ? editProfile.profileImg : image}
          alt="userProfileImg"
        />

        {/* input 숨기기 */}
        <Stinput
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={changeImageHandler}
        />
        <UpdateIcon onClick={imgUpdateHandler}>
          <AiOutlineCamera size="30" color="gray" />
        </UpdateIcon>
      </StImgBox>

      <StTextBox>
        <div>
          <label>닉네임 </label>
          <input
            name="nickname"
            value={editProfile.nickname}
            onChange={changeInputHandler}
          />
        </div>

        <div>
          <label>한 줄 소개 </label>
          <input
            name="introduction"
            value={editProfile.introduction}
            onChange={changeInputHandler}
          />
        </div>
      </StTextBox>

      <button onClick={updateUserProfileHandler}>수정하기</button>
    </StUserProfileModal>
  );
}

export default UpdateUserProfileModal;

const StUserProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 800px;
  height: 600px;
  background-color: white;
  position: fixed;
  z-index: 10201;
  top: 15%;
  left: 30%;
  gap: 10px;
`;

const StImgBox = styled.div`
  background-color: #ebb55f92;
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;

const PreviewImg = styled.img`
  background-color: #2e2ede;
  width: 300px;
  height: 300px;
  border-radius: 50%;
`;
const UpdateIcon = styled.button`
  background-color: white;
  border: 2px solid gray;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(200%, -100%);
`;

const StTextBox = styled.div`
  background-color: #ffc0cb62;
  width: 500px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  input {
    border: 1px solid black;
  }
`;

const Stinput = styled.input`
  display: none;
`;

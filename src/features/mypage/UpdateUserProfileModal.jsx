import React, { useRef, useState } from "react";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import { useUpdateUserProfile } from "../../hooks/mypage/useUpdateUserProfile";
import { useGetimgurl } from "../../hooks/mypage/useGetImgUrl";
import upload from "../../assets/imgs/upload_gray.png";
import cancel from "../../assets/imgs/common/cancel.png";
import * as Style from "../mypage/css/UpdateUserProfileModalStyle";

function UpdateUserProfileModal({ setOpenModal }) {
  //모달 open 관리
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

    if (image === "") {
      //바꾸려는 이미지가 없을 시, s3imgurlhandle에 이미지 안 보내야함.
      //-> 이미지 제외하고 텍스트만 보냄.
      updateUserProfile({ ...editProfile });
      setOpenModal(false);
    } else if (fileRef) {
      //update query에 payload로 넣어줄 fileImg = useRef 사용해서 받아둔 파일
      const fileImg = s3imgurlhandle(fileRef.current.files[0]);
      console.log(fileImg, "fileImg"); //파일 확인
      updateUserProfile({ ...editProfile, profileImg: fileImg });
      setOpenModal(false);
    }
  };

  const imgUpdateHandler = () => {
    fileRef.current.click();
  };

  //이미지를 선택하고 선택한 이미지를 미리보여주는 로직
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
    <Style.StUserProfileModal>
      <Style.StCloseBtn onClick={updateModalCloseHandler}>
        <img src={cancel} alt="cancel" />
      </Style.StCloseBtn>

      <Style.StImgContainer>
        <Style.StImgBox>
          <div>
            <Style.ProfileImg
              name="profileImg"
              src={image === "" ? editProfile.profileImg : image}
              alt="userProfileImg"
            />
          </div>

          <Style.StImgEditWrap>
            {/* input 숨기기 */}
            <Style.StInput
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={changeImageHandler}
            />
            <Style.UpdateIcon onClick={imgUpdateHandler}>
              <img src={upload} alt="upload" />
              프로필 사진 변경
            </Style.UpdateIcon>
            <div>10MB 이내의 이미지 파일을 업로드해주세요</div>
          </Style.StImgEditWrap>
        </Style.StImgBox>
      </Style.StImgContainer>

      <Style.StTextBox>
        <Style.StEditInputNameWrap>
          <div>닉네임 </div>
          <div>소개 </div>
        </Style.StEditInputNameWrap>

        <Style.StEditInputWrap>
          <Style.NameInput
            label="닉네임"
            name="nickname"
            value={editProfile.nickname}
            onChange={changeInputHandler}
            maxLength="8"
          />

          <div>닉네임은 2글자 이상 입력해주세요</div>

          <Style.IntroInput
            label="소개"
            name="introduction"
            value={editProfile.introduction}
            onChange={changeInputHandler}
            maxLength="55"
          />
        </Style.StEditInputWrap>
      </Style.StTextBox>

      <Style.StUpdateBtn onClick={updateUserProfileHandler}>
        수정하기
      </Style.StUpdateBtn>
    </Style.StUserProfileModal>
  );
}

export default UpdateUserProfileModal;

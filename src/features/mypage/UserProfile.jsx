import React, { useEffect, useRef, useState } from "react";
import AlarmContainer from "./AlarmContainer";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import UpdateModalBlackBg from "./UpdateModalBlackBg";
import { useGetUserProfile } from "../../hooks/mypage/useGetUserProfile";
import { usePatchRole } from "../../hooks/mypage/usePatchRole";
import palette from "../../assets/imgs/mypage/palette_gradient.png";
import setting from "../../assets/imgs/mypage/gear_gray.png";
import * as UserProfileStyle from "../mypage/css/UserProfileStyle";
import Swal from "sweetalert2";

function UserProfile() {
  //react-query
  const { userProfile } = useGetUserProfile();
  const { patchRole } = usePatchRole();

  const [openModal, setOpenModal] = useState(false); //모달 open 관리
  const [openSet, setOpenSet] = useState(false); //수정, 작가신청 setting div

  const openSettingHandler = () => {
    setOpenSet(prevOpenSet => !prevOpenSet);
  };

  //프로필 수정 클릭
  const updateUserProfileHandler = () => {
    setOpenModal(true);
  };

  //작가 신청 클릭
  const [roleApplied, setRoleApplied] = useState(false);
  const changeRoleHandler = () => {
    if (userProfile?.role === "UR04") {
      Swal.fire({
        title: "\n이미 신청 완료하였습니다.",
        focusConfirm: false,
      });

      return;
    } else if (userProfile?.role === "UR02") {
      Swal.fire({
        title: "\n이미 작가 인증이 완료되었습니다.",
        focusConfirm: false,
      });
      return;
    } else {
      const confirmResult = window.confirm("작가 신청을 하시겠습니까?");
      if (confirmResult) {
        //작가신청 PATCH
        patchRole();
        setRoleApplied(true);
        Swal.fire({
          title: "\n작가 신청이 완료되었습니다!",
          focusConfirm: false,
        });
      }
    }
  };

  //setting div 닫기
  const ref = useRef(null);
  const closeSettingHandler = () => {
    setOpenSet(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeSettingHandler();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <UserProfileStyle.StUserProfileBox>
        <UserProfileStyle.ProfileImg
          src={userProfile?.profileImg}
          alt="userProfileImg"
        />

        <UserProfileStyle.StEditBtnWrap>
          <UserProfileStyle.UpdateBtn onClick={openSettingHandler}>
            <img src={setting} alt="setting" />
          </UserProfileStyle.UpdateBtn>
          {openSet && (
            <UserProfileStyle.StSettingBtn
              ref={ref}
              onMouseDown={e => e.stopPropagation()}
            >
              <div onClick={updateUserProfileHandler}>프로필 수정</div>
              <button
                onClick={changeRoleHandler}
                disabled={roleApplied && userProfile?.role === "UR04"}
              >
                작가 신청
              </button>
            </UserProfileStyle.StSettingBtn>
          )}
        </UserProfileStyle.StEditBtnWrap>

        <UserProfileStyle.StUserNameWrap>
          <UserProfileStyle.StInfoUserName>
            {userProfile?.nickname}
          </UserProfileStyle.StInfoUserName>
          {userProfile?.role === "UR02" ? (
            <UserProfileStyle.StArtistMark>
              <img src={palette} alt="palette" />
            </UserProfileStyle.StArtistMark>
          ) : null}
        </UserProfileStyle.StUserNameWrap>

        <UserProfileStyle.StUserInfoIntro>
          <UserProfileStyle.InfoIntro>
            {userProfile?.introduction}
          </UserProfileStyle.InfoIntro>
        </UserProfileStyle.StUserInfoIntro>

        <UserProfileStyle.Line></UserProfileStyle.Line>

        <AlarmContainer />
      </UserProfileStyle.StUserProfileBox>

      {/* 유저 프로필 수정을 위한 모달 open */}
      {openModal && <UpdateUserProfileModal setOpenModal={setOpenModal} />}
      {/* 모달 열림과 동시에 어두운 백그라운드 넣어주고 어두운 부분 클릭시 모달 닫힘 */}
      {openModal && <UpdateModalBlackBg setOpenModal={setOpenModal} />}
    </>
  );
}

export default UserProfile;

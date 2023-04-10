import React from "react";
import UserProfile from "../features/mypage/UserProfile";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";

function MyPage() {
  return (
    <>
      <Header />
      <Article>
        <UserProfile />
        {/* 추후 좋아요 누른 전시, 아트그램 컴포넌트 추가될 예정  */}
      </Article>
    </>
  );
}

export default MyPage;

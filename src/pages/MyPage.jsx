import React from "react";
import UserProfile from "../features/mypage/UserProfile";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ArtgramContainer from "../features/mypage/ArtgramContainer";
import styled from "styled-components";
import ExhibitionContainer from "../features/mypage/ExhibitionContainer";

function MyPage() {
  return (
    <>
      <Header />
      <Article>
        <StContainer>
          <TopContainer>
            <UserProfile />
          </TopContainer>

          <BottomContainer>
            <ExhibitionContainer />
            <ArtgramContainer />
          </BottomContainer>
        </StContainer>
      </Article>
    </>
  );
}

export default MyPage;
const StContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const TopContainer = styled.div`
  width: 500px;
  height: 930px;
  background-color: #0077ff36;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;
const BottomContainer = styled.div`
  background-color: #0077ff36;
  width: 1200px;
  height: 930px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

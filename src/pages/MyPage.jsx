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
          <LeftContainer>
            <UserProfile />
          </LeftContainer>

          <RightContainer>
            <ExhibitionContainer />
            <ArtgramContainer />
          </RightContainer>
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

const LeftContainer = styled.div`
  width: 550px;
  height: 930px;
  background-color: #0077ff10;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
`;
const RightContainer = styled.div`
  background-color: #0077ff21;
  width: 1100px;
  height: 930px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

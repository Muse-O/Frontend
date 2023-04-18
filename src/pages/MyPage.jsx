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
  width: 1675px;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContainer = styled.div`
  width: 1060px;
  height: 935px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//height: 937px

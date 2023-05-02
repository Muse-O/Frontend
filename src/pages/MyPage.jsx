import React, { useEffect } from "react";
import UserProfile from "../features/mypage/UserProfile";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import ArtgramContainer from "../features/mypage/ArtgramContainer";
import styled from "styled-components";
import ExhibitionContainer from "../features/mypage/ExhibitionContainer";
import { useRecoilState } from "recoil";
import { headerStatedefalut } from "../components/headerStore";

function MyPage() {
  const [headerState, setHeaderState] = useRecoilState(headerStatedefalut);
  useEffect(() => {
    setHeaderState({ ...headerState, mypages: true });
  }, []);

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
  background-color: #f6f2f9;
  width: 1675px;
  display: flex;

  @media (max-width: 1440px) {
    width: 1256.25px;
  }
`;

const LeftContainer = styled.div`
  width: 560px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1440px) {
    width: 420px;
  }
`;

const RightContainer = styled.div`
  width: 1060px;
  height: 935px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1440px) {
    width: 795px;
    height: 701.25px;
  }
`;

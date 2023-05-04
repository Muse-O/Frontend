import React from "react";
// import CSS --------------------------------------------------------------------------------------------/
import { Article } from "../shared/GlobalStyled";
import { MainLayout } from "../features/main/css/mainparts";
// import 커스텀 훅 ----------------------------------------------------------------------------------------/
import { useHeaderState } from "../hooks/useHeaderState";
// import 컴포넌트 -----------------------------------------------------------------------------------------/
import Header from "../components/Header";
import MainFirst from "../features/main/MainFirst";
import MainSecond from "../features/main/MainSecond";
import MainThird from "../features/main/MainThird";
import MainFourth from "../features/main/MainFourth";
import MainFifith from "../features/main/MainFifith";
import TopButton from "../components/TopButton";


function Main() {
  useHeaderState("home")
  return (
    <>
      <Header />
      <Article>
        <MainLayout>
          <MainFirst />
          <MainSecond />
          <MainThird />
          <MainFourth />
          <MainFifith />
          <TopButton />
        </MainLayout>
      </Article>
    </>
  );
}

export default Main;

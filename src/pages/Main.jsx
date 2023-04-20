import React  from "react";
import Header from "../components/Header";
import { Article } from "../shared/GlobalStyled";
import { MainLayout } from "../features/main/css/mainparts";
import MainFirst from '../features/main/MainFirst'
import MainSecond from '../features/main/MainSecond'
import MainThird from '../features/main/MainThird'
import MainFourth from '../features/main/MainFourth'
import MainFifith from '../features/main/MainFifith'

function Main() {
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
        </MainLayout>
      </Article>
    </>
  );
}

export default Main;

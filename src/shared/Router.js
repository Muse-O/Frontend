import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import { ProtectedRoute } from "./protectedRoute";
import { ContainerWrap, MainWrap, Wrap } from "./GlobalStyled";
import Artgram from "../pages/Artgram";
import CreateArtgram from "../pages/CreateArtgram";
import CreateExhibition from "../pages/CreateExhibition";
import DetailExhibition from "../pages/DetailExhibition";
import Exhibition from "../pages/Exhibition";
import MyPage from "../pages/MyPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateExhibition from "../pages/UpdateExhibition";

function Router() {
  const pages = [
    { pathname: "/", element: <Main />, isPublic: true, isLogin: true },
    { pathname: "/login", element: <Login />, isPublic: true, isLogin: false },
    {
      pathname: "/artgram",
      element: <Artgram />,
      isPublic: true,
      isLogin: true,
    },
    {
      pathname: "/artgram/create",
      element: <CreateArtgram />,
      isPublic: false,
      isLogin: true,
    },
    {
      pathname: "/exhibition/create",
      element: <CreateExhibition />,
      isPublic: false,
      isLogin: true,
    },
    {
      pathname: "/exhibition/detail/:id",
      element: <DetailExhibition />,
      isPublic: true,
      isLogin: true,
    },
    {
      pathname: "/exhibition/update/:id",
      element: <UpdateExhibition />,
      isPublic: false,
      isLogin: true,
    },
    {
      pathname: "/exhibition",
      element: <Exhibition />,
      isPublic: true,
      isLogin: true,
    },
    {
      pathname: "/mypage",
      element: <MyPage />,
      isPublic: false,
      isLogin: true,
    },
    {
      pathname: "/register",
      element: <Register />,
      isPublic: true,
      isLogin: false,
    },
  ];
  return (
    <BrowserRouter>
      <Wrap>
        <MainWrap>
          <ContainerWrap>
            <Routes>
              {pages.map((page) => {
                return (
                  <Route
                    key={page.pathname}
                    path={page.pathname}
                    element={
                      <ProtectedRoute
                        isPublic={page.isPublic}
                        isLogin={page.isLogin}
                      >
                        {page.element}
                      </ProtectedRoute>
                    }
                  />
                );
              })}
            </Routes>
          </ContainerWrap>
        </MainWrap>
      </Wrap>
    </BrowserRouter>
  );
}

export default Router;

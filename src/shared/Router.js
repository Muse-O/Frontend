import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { cookies } from "./cookies";
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
  const token = cookies.get("access_token");
  const pages = [
    { pathname: "/", element: <Main />, isPublic: true, isLogin: false },
    { pathname: "/login", element: <Login />, isPublic: true, isLogin: false },
    {
      pathname: "/artgram",
      element: <Artgram />,
      isPublic: true,
      isLogin: false,
    },
    {
      pathname: "/artgram/create",
      element: <CreateArtgram />,
      isPublic: false,
      isLogin: false,
    },
    {
      pathname: "/exhibition/create",
      element: <CreateExhibition />,
      isPublic: true,
      isLogin: false,
    },
    {
      pathname: "/exhibition/detail/:id",
      element: <DetailExhibition />,
      isPublic: true,
      isLogin: false,
    },
    {
      pathname: "/exhibition/update/:id",
      element: <UpdateExhibition />,
      isPublic: true,
      isLogin: false,
    },
    {
      pathname: "/exhibition",
      element: <Exhibition />,
      isPublic: true,
      isLogin: false,
    },
    {
      pathname: "/mypage",
      element: <MyPage />,
      isPublic: true,
      isLogin: false,
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
                const isAuthenticated = page.isPublic || token;
                // const isLogined =page.isLogin&&token;
                return (
                  <Route
                    key={page.pathname}
                    path={page.pathname}
                    element={
                      <ProtectedRoute
                        token={token}
                        pathname={page.pathname}
                        isAuthenticated={isAuthenticated}
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

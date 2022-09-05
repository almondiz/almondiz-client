import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import BottomNav from './components/bottom-nav';

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import Feed from "./pages/feed";
import DetailPage from "./pages/detail-page";
import MyPage from "./pages/my-page";
import ReviewEditor from "./pages/review-editor";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  )
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/my-page" element={<MyPage />} />

          <Route path="/detail-page" element={<DetailPage />} />
          <Route path="/review-editor" element={<ReviewEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

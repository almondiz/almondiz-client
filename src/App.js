import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { FeedModel, UserModel } from "./models";



import BottomNav from './components/bottom-nav';

import LoginPage from "./views/login";
import SignupPage from "./views/signup";
import Feed from "./views/feed";
import Post from "./views/post";
import MyPage from "./views/my-page";
import EditPost from "./views/edit-post";

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

          <Route path="/post" element={<Post index={0} />} />
          <Route path="/edit-post" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

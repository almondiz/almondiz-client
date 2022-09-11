import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setScrollDirection } from "./store/slices/global";

import { UserModel } from "./models";
import UserViewModel from "./view-models/user";

import LoginPage from "./views/login";
import SignupPage from "./views/signup";
import Feed from "./views/feed";
import Post from "./views/post";
import Search from "./views/search";
import Scrap from "./views/scrap";
import Profile from "./views/profile";
import EditPost from "./views/edit-post";

import BottomNav from "./components/bottom-nav";


const Monitor = () => {
  const dispatch = useDispatch();

  // scroll handler
  const initScrollHandler = () => {
    const THRESHOLD = 5;
    let lastScrollY = window.pageYOffset;
    const scrollDirection = useSelector(state => state.global.scrollDirection);
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;   // same as window.scrollY
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      if (scrollY <= 0 || scrollY + windowHeight >= documentHeight)
        dispatch(setScrollDirection(0));
      else {
        const direction = scrollY > lastScrollY ? 1 : -1;
        if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) >= THRESHOLD)
          dispatch(setScrollDirection(direction));
      }
      lastScrollY = scrollY;
    };

    useEffect(() => {
      window.addEventListener("scroll", updateScrollDirection);                   // componentDidMount  
      return () => window.removeEventListener("scroll", updateScrollDirection);   // componentWillUnmount
    });
  };
  initScrollHandler();

  // gps handler
  const initLocationHandler = () => {
  };
  initLocationHandler();

  return <></>;
};


const MainLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
};

const App = () => {
  const userViewModel = new UserViewModel(new UserModel());
  const me = userViewModel.getMyData();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route element={<MainLayout />}>
            <Route path="/" element={<Feed me={me} />} />
            <Route path="/post" element={<Post index={0} me={me} />} />

            <Route path="/search" element={<Search />} />
            <Route path="/scrap" element={<Scrap />} />
            <Route path="/my-page" element={<Profile uid={me.profile.uid} me={me} />} />
          </Route>
          <Route path="/edit-post" element={<EditPost />} />
        </Routes>
      </BrowserRouter>

      <Monitor />
    </>
  );
};

export default App;

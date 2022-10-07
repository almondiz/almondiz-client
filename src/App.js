import React, { useEffect, useRef } from "react";
import { useLocation, BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setScrollDirection } from "./store/slices/global";

import { UserModel } from "./models";

import Login from "./views/login";
import Signup from "./views/signup";
import Feed from "./views/feed";
import Post from "./views/post";
import Search from "./views/search";
import Scrap from "./views/scrap";
import Profile from "./views/profile";
import Subscriptions from "./views/subscriptions";
import Edit from "./views/edit";
import Notice from "./views/notice";
import Settings from "./views/settings";
import NotFound from "./views/not-found";

import Float from "./components/float";
import Backdrop from "./components/backdrop";
import MainBottomNav from "./components/main-bottom-nav";


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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <></>;
};


const MainLayout = ({ floatRef }) => {
  useEffect(() => {
    floatRef.current?.setBottom(<MainBottomNav />);
    return () => floatRef.current?.setBottom();
  });
  
  return <Outlet />;
};

const App = () => {
  const userModel = new UserModel();
  const myUserId = userModel.getMyUserId();

  const floatRef = useRef();
  const backdropRef = useRef();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<MainLayout floatRef={floatRef} />}>
            <Route path="/feed" element={<Feed backdropRef={backdropRef} />} />
            <Route path="/post" element={<Post floatRef={floatRef} postId={1} />} />

            <Route path="/search" element={<Search floatRef={floatRef} />} />
            <Route path="/scrap" element={<Scrap floatRef={floatRef} />} />
            <Route path="/me" element={<Navigate to={`/profile/${myUserId}`} />} />
            <Route path="/profile/:userId" element={<Profile floatRef={floatRef} />} />

            <Route path="/subscriptions" element={<Subscriptions floatRef={floatRef} />} />
          </Route>

          <Route path="/edit" element={<Edit floatRef={floatRef} backdropRef={backdropRef} />} />

          <Route path="/notice" element={<Notice floatRef={floatRef} />} />
          <Route path="/settings" element={<Settings floatRef={floatRef} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Float ref={floatRef} />
        <Backdrop ref={backdropRef} />

        <ScrollToTop />

        <Monitor />
      </BrowserRouter>
    </>
  );
};

export default App;

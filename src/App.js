import React, { useEffect, useRef } from "react";
import { useLocation, BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setScrollDirection } from "./store/slices/global";

import { UserModel } from "./models";

import LoginPage from "./views/login";
import SignupPage from "./views/signup";
import FeedPage from "./views/feed";
import PostPage from "./views/post";
import SearchPage from "./views/search";
import ScrapPage from "./views/scrap";
import ProfilePage from "./views/profile";
import SubscriptionsPage from "./views/subscriptions";
import EditPage from "./views/edit";
import NoticePage from "./views/notice";
import SettingsPage from "./views/settings";
import NotFoundPage from "./views/not-found";

import Float from "./components/float";
import Backdrop from "./components/backdrop";
import PostBottomNav from "./components/post-bottom-nav";

import store from "./store";


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


const PostLayout = ({ floatRef }) => {
  useEffect(() => {
    floatRef.current?.setBottom(<PostBottomNav />);
    return () => floatRef.current?.setBottom();
  });
  
  return <Outlet />;
};

const RequireAuth = () => {
  if (store.getState().account.accessToken) return <Outlet />;
  else return (<Navigate to="/login" />);
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

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route element={<RequireAuth/>}>
            <Route element={<PostLayout floatRef={floatRef} />}>
              <Route path="/feed" element={<FeedPage backdropRef={backdropRef} />} />
              <Route path="/post/:postId" element={<PostPage floatRef={floatRef} />} />
              <Route path="/search" element={<SearchPage floatRef={floatRef} />} />
              <Route path="/profile/:userId" element={<ProfilePage floatRef={floatRef} />} />

              <Route path="/scrap" element={<ScrapPage floatRef={floatRef} />} />
              <Route path="/me" element={<Navigate to={`/profile/${myUserId}`} />} />
              <Route path="/subscriptions" element={<SubscriptionsPage floatRef={floatRef} />} />
            </Route>
            <Route path="/edit" element={<EditPage floatRef={floatRef} backdropRef={backdropRef} />} />
            <Route path="/notice" element={<NoticePage floatRef={floatRef} />} />
            <Route path="/settings" element={<SettingsPage floatRef={floatRef} />} />
          </Route>

          {/*<Route element={<PostLayout floatRef={floatRef} />}>
            <Route path="/feed" element={<FeedPage backdropRef={backdropRef} />} />
            <Route path="/post/:postId" element={<PostPage floatRef={floatRef} />} />
            <Route path="/search" element={<SearchPage floatRef={floatRef} />} />
            <Route path="/profile/:userId" element={<ProfilePage floatRef={floatRef} />} />
          </Route>*/}

          <Route path="*" element={<NotFoundPage />} />
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

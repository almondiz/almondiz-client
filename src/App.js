import React, { useState, useEffect, useRef } from "react";
import { useLocation, BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import store from "./store";
import { useDispatch } from "react-redux";
import { setScrollDirection } from "./store/slices/global";

import { StaticComponentRefs } from "./util";

import LoginPage from "./views/login";
import SignupPage from "./views/signup";
import FeedPage from "./views/feed";
import PostPage from "./views/post";
import SearchPage from "./views/search";
import ScrapPage from "./views/scrap";
import UserPage from "./views/user";
import FollowingPage from "./views/following";
import EditPage from "./views/edit";
import DirectPage from "./views/direct";
import NoticePage from "./views/notice";
import MenuPage from "./views/menu";
import NotFoundPage from "./views/not-found";

import Float from "./components/float";
import Backdrop from "./components/backdrop";
import Modal from "./components/modal";
import Toast from "./components/toast";
import PostBottomNav from "./components/post-bottom-nav";


const Monitor = () => {
  const dispatch = useDispatch();

  // scroll handler
  const initScrollHandler = () => {
    const THRESHOLD = 5;
    let lastScrollY = window.pageYOffset;
    const scrollDirection = store.getState().global.scrollDirection;
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
    }, []);
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


const StaticLayout = ({ setLoaded }) => {
  const floatRef = useRef();
  const backdropRef = useRef();
  const modalRef = useRef();
  const toastRef = useRef();
  useEffect(() => {
    StaticComponentRefs.floatRef = floatRef;
    StaticComponentRefs.backdropRef = backdropRef;
    StaticComponentRefs.modalRef = modalRef;
    StaticComponentRefs.toastRef = toastRef;
    setLoaded(true);
  }, []);

  return (
    <>
      <Float ref={floatRef} />
      <Backdrop ref={backdropRef} />
      <Modal ref={modalRef} />
      <Toast ref={toastRef} />
    </>
  );
};
const PostLayout = () => {
  useEffect(() => {
    const floatRef = StaticComponentRefs.floatRef;
    (floatRef?.current?.setBottom(<PostBottomNav />));
    return () => (floatRef?.current?.setBottom());
  }, []);

  return <Outlet />;
};


const RequireAuth = () => {
  const { pathname } = useLocation();
  const { toastRef } = StaticComponentRefs;

  if (store.getState().account.accessToken) {
    if (pathname === `/`)
      return <Navigate to="/feed" />;
    else
      return <Outlet />;
  } else {
    if (pathname === `/`)
      return <Navigate to="/login" />;
    else if (pathname !== `/login`) {
      toastRef?.current?.log("권한이 없어 로그인 페이지로 이동합니다.");
      return <Navigate to="/login" />;
    }
  }
};
const RedirectToMyPage = () => {
  const myUserId = store.getState().account.myUserId;

  return <Navigate to={`/user/${myUserId}`} />;
};

const App = () => {
  const [staticLayoutLoaded, setStaticLayoutLoaded] = useState(false);

  return (
    <>
      <BrowserRouter>
        {staticLayoutLoaded && (
          <Routes>
            <Route exact path="/" element={<RequireAuth />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route element={<RequireAuth />}>
              <Route element={<PostLayout />}>
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/post/:postId" element={<PostPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/user/:userId" element={<UserPage />} />

                <Route path="/scrap" element={<ScrapPage />} />
                <Route path="/me" element={<RedirectToMyPage />} />
              </Route>

              <Route path="/edit" element={<EditPage />} />
              <Route path="/direct" element={<DirectPage />} />

              <Route path="/following" element={<FollowingPage />} />
              <Route path="/notice" element={<NoticePage />} />
              <Route path="/menu" element={<MenuPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        )}

        <StaticLayout setLoaded={setStaticLayoutLoaded} />
        <ScrollToTop />
        <Monitor />
      </BrowserRouter>
    </>
  );
};

export default App;

import React, { useState, useEffect, useRef } from "react";
import { useLocation, BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import store from "./store";

import { StaticComponentRefs } from "./asset/common/controllers";
import { ScrollToTop } from "./asset/common/components";
import Monitor from "./components/monitor";
import Float from "./components/float";
import Backdrop from "./components/backdrop";
import Modal from "./components/modal";
import Toast from "./components/toast";
import PostBottomNav from "./components/post-bottom-nav";

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


const Root = () => {
  const location = useLocation();
  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      const { toastRef } = StaticComponentRefs;
      toastRef?.current?.log(message);
    }
  }, []);

  const { accessToken } = store.getState().account;
  if (accessToken)
    return <Navigate to="/feed" />;
  else
    return <Navigate to="/login" />;
};
const Login = () => {
  const { accessToken } = store.getState().account;
  if (accessToken)
    return <Navigate to="/" />;
  else
    return <LoginPage />;
};
const Signup = () => {
  const location = useLocation();
  const valid = location.state?.valid;
  if (valid)
    return <SignupPage />;
  else
    return <Navigate to="/" />;
};

const RequireAuth = () => {
  const { accessToken } = store.getState().account;
  if (accessToken) {
    return <Outlet />;
  } else {
    const REDIRECT_MESSAGE = "권한이 없어 로그인 페이지로 이동합니다.";
    return <Navigate to="/" state={{ message: REDIRECT_MESSAGE }} />;
  }
};
const RedirectToMyPage = () => {
  const { myUserId } = store.getState().account;

  return <Navigate to={`/user/${myUserId}`} />;
};


const App = () => {
  const [staticLayoutLoaded, setStaticLayoutLoaded] = useState(false);

  return (
    <>
      <BrowserRouter>
        {staticLayoutLoaded && (
          <Routes>
            <Route exact path="/" element={<Root />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
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
        <Monitor />
        
        <ScrollToTop />
      </BrowserRouter>
    </>
  );
};
export default App;

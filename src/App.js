import React, { useEffect, useRef } from "react";
import { useLocation, BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setScrollDirection } from "./store/slices/global";

import { UserModel } from "./models";
import { UserViewModel } from "./view-models";

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
import BottomNav from "./components/bottom-nav";

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
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return <></>;
};


const MainLayout = ({ floatRef }) => {
  useEffect(() => {
    floatRef.current?.setBottomNav(<BottomNav />);
    return () => floatRef.current?.setBottomNav(<></>);
  });
  
  return <Outlet />;
};

const RequireAuth = () => {
  if (store.getState().account.accessToken) return <Outlet />;
  else return (<Navigate to="/login" />);
};

const App = () => {
  const userViewModel = new UserViewModel(new UserModel());
  const myUserId = userViewModel.getMyUserId();

  const floatRef = useRef();
  const backdropRef = useRef();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<RequireAuth/>}>
            <Route element={<MainLayout floatRef={floatRef} />}>
              <Route path="/feed" element={<Feed backdropRef={backdropRef} />} />
              <Route path="/post" element={<Post postId={1} floatRef={floatRef} />} />

              <Route path="/search" element={<Search />} />
              <Route path="/scrap" element={<Scrap />} />
              <Route path="/me" element={<Navigate to={`/profile/${myUserId}`} />} />
              <Route path="/profile/:userId" element={<Profile floatRef={floatRef} />} />

              <Route path="/subscriptions" element={<Subscriptions />} />
            </Route>

            <Route path="/edit" element={<Edit floatRef={floatRef} backdropRef={backdropRef} />} />

            <Route path="/notice" element={<Notice />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

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

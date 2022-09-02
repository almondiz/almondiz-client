import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import BottomNav from './components/bottom-nav';

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import FeedList from "./pages/feed-list";
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
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Layout />}>*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/feed" element={<FeedList />} />
          <Route path="/detail-page" element={<DetailPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/review-editor" element={<ReviewEditor />} />
        </Route>
        {/*<Route index element={<Home />} />*/}
        {/*<Route path="blogs" element={<Blogs />} />*/}
        {/*<Route path="contact" element={<Contact />} />*/}
        {/*<Route path="*" element={<NoPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

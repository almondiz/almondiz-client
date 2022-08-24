import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import FeedList from "./pages/feed-list";
import DetailPage from "./pages/detail-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Layout />}>*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/feed" element={<FeedList />} />

        <Route path="/detail-page" element={<DetailPage />} />
        {/*<Route index element={<Home />} />*/}
        {/*<Route path="blogs" element={<Blogs />} />*/}
        {/*<Route path="contact" element={<Contact />} />*/}
        {/*<Route path="*" element={<NoPage />} />*/}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

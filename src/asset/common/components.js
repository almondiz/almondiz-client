import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";


export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <></>;
};


export const NoScroll = () => {
  useEffect(() => {
    const bodyDOM = document.body;
    bodyDOM.classList.add("noscroll");
    return () => bodyDOM.classList.remove("noscroll");
  }, []);

  return <></>;
};
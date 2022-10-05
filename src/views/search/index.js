import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer, NoScroll } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import CloseIcon from "../../asset/icons/mui/close-icon";


const makeTag = ([ name, region, deletable ], idx) => {
  return (
    <li key={idx} className={`tag tag-${region ? "region" : "food"}`}>
      {name}
      {deletable && <button className="tag-cancel-button"><CloseIcon /></button>}
    </li>
  );
};


const SearchDrawer = ({ contentRef }) => {
  const scrollDirection = useSelector(state => state.global.scrollDirection);

  const [tf, setTf] = useState("");
  const onInput = e => setTf(e.target.value);
  useEffect(() => {

    tagFramer.move(tf ? 1 : 0);
  }, [tf]);

  const DummyContent = () => {
    const postViewModel = new PostViewModel(new PostModel());
    const posts = postViewModel.getDummyData();
    const makePost = (post, idx) => <PostItem key={idx} postId={post.id} post={post} />;

    return <section className="post-list">{posts.map(makePost)}</section>;
  };
  const contentHandler = tfFrameIndex => {
    tfFramer.move(tfFrameIndex);
    switch (tfFrameIndex) {
      case 0:
        contentRef.current?.show({});
        break;
      case 2:
        contentRef.current?.show({ content: <DummyContent /> });
        break;
    }
    setTf("");
  };

  const tagFramer = new Framer([
    (
      <div className="tags-wrap">
        <ul className="tags">{[ ["맥주", false, true], ["호프", false, true], ["대구", true, true] ].map(makeTag)}</ul>
        <button className="button-search" onClick={() => contentHandler(2)}>
          <div className="icon-sm"><SearchIconBorder /></div>
          <p>검색하기</p>
        </button>
      </div>
    ),
    (
      <>
        <div className="tag-list-group">
          <h3 className="subheader">음식</h3>
          <ul className="list">
            <li className="item" onClick={() => setTf("")}>대구탕</li>
          </ul>
        </div>
        <div className="tag-list-group">
          <h3 className="subheader">지역</h3>
          <ul className="list">
            <li className="item" onClick={() => setTf("")}>대구</li>
            <li className="item" onClick={() => setTf("")}>대구 남구</li>
            <li className="item" onClick={() => setTf("")}>대구 달서구</li>
            <li className="item" onClick={() => setTf("")}>대구 북구</li>
            <li className="item" onClick={() => setTf("")}>대구 중구</li>
          </ul>
        </div>
      </>
    ),
  ]);
  const tfFramer = new Framer([
    (
      <section className="tf-frame tf-frame-1">
        <header className="header">
          <h1 className="title">Search</h1>
          <div className="right" />
        </header>
        <div className="tf" onClick={() => { contentHandler(1); }}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder="메뉴나 지역을 입력해 보세요" value={tf} readOnly />
        </div>
        <div className="history-list-group">
          <h3 className="subheader">검색 기록</h3>
          <ul className="list">
            <li className="item">
              <ul className="tags">{[ ["한식"], ["서울", true] ].map(makeTag)}</ul>
              <button className="delete-item-button"><CloseIcon /></button>
            </li>
            <li className="item">
              <ul className="tags">{[ ["짬뽕"], ["성남 분당구", true], ["수원 팔달구 우만동", true] ].map(makeTag)}</ul>
              <button className="delete-item-button"><CloseIcon /></button>
            </li>
            <li className="item">
              <ul className="tags">{[ ["스시"], ["마라탕"], ["천안", true] ].map(makeTag)}</ul>
              <button className="delete-item-button"><CloseIcon /></button>
            </li>
          </ul>
        </div>

        <NoScroll />
      </section>
    ), 
    (
      <section className="tf-frame tf-frame-2">
        <header className="header">
          <h1 className="title">Search</h1>
          <div className="right" />
        </header>
        <div className="tf">
          <button className="tf-icon" onClick={() => contentHandler(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder="메뉴나 지역을 입력해 보세요" value={tf} onChange={onInput} autoFocus />
          {tf && <button className="tf-clear-button" onClick={() => setTf("")}><CancelIconFill /></button>}
        </div>
        {tagFramer.view()}

        <NoScroll />
      </section>
    ),
    (
      <section className={`tf-frame tf-frame-3 ${scrollDirection === 1 ? "hide" : ""}`}>
        <header className="header">
          <h1 className="title">Search</h1>
          <div className="right" />
        </header>
        <div className="tf">
          <button className="tf-icon" onClick={() => contentHandler(0)}><ArrowBackIosIcon /></button>
          <div className="tf-box" onClick={() => contentHandler(1)}>
            <ul className="tags">{[ ["맥주", false], ["호프", false], ["대구", true] ].map(makeTag)}</ul>
          </div>
        </div>
      </section>
    ),
  ]);

  return <aside className="search-drawer">{tfFramer.view()}</aside>;
};



const SearchContent = forwardRef((_, ref) => {
  const InitContent = () => <></>;
  
  const [content, setContent] = useState(<InitContent />);
  const show = ({ content=<InitContent /> }) => setContent(content);
  useImperativeHandle(ref, () => ({ show: show, }));

  return <main className="content">{content}</main>;
});

const Search = ({}) => {
  const contentRef = useRef();

  return (
    <div className="page">
      <header className="header" />
      <SearchDrawer contentRef={contentRef} />
      <SearchContent ref={contentRef} />
    </div>
  );
};


export default Search;
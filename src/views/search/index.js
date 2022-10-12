import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";

import { Frame, NoScroll } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import TagList, { TagController } from "../../components/tag-list";
import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import CloseIcon from "../../asset/icons/mui/close-icon";


const Drawer = ({ contentRef }) => {
  const scrollDirection = useSelector(state => state.global.scrollDirection);

  const tfPlaceholder = "메뉴나 지역을 입력해 보세요";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0);
  }, [tf]);

  const PostList = () => {
    // POST API
    const dataList = (() => {
      const postViewModel = new PostViewModel(new PostModel());
      return postViewModel.getDummyData();
    })();
    //
    
    return <section className="post-list">{dataList.map((data, idx) => <PostItem key={idx} data={data} />)}</section>
  };
  const tfHandler = tfFrameIndex => {
    tfFrame.move(tfFrameIndex);
    switch (tfFrameIndex) {
      case 0:
        setTf("");
        contentRef.current?.show({});
        break;
      case 1:
        setTf("");
        break;
      case 2:
        setTf("");
        contentRef.current?.show({ content: <PostList /> });
        break;
    }
  };

  // TAG
  const tagController = new TagController([ "맥주", "호프", ["대구", true] ]);
  const onClickTagItem = data => {
    tagController.push(data);
    setTf("");
  };
  //

  const tagFrame = new Frame([
    (
      <>
        <TagList controller={tagController} />
        <button className="button button-search" onClick={() => tfHandler(2)}>
          <div className="icon"><SearchIconBorder /></div>
          <p>검색하기</p>
        </button>
      </>
    ),
    (
      <>
        <div className="tag-list-group">
          <h3 className="subheader">음식</h3>
          <ul className="list">
            <li className="item" onClick={() => onClickTagItem("대구탕")}>대구탕</li>
          </ul>
        </div>
        <div className="tag-list-group">
          <h3 className="subheader">지역</h3>
          <ul className="list">
            <li className="item" onClick={() => onClickTagItem({ name: "대구", type: "region" })}>대구</li>
            <li className="item" onClick={() => onClickTagItem({ name: "대구 남구", type: "region" })}>대구 남구</li>
            <li className="item" onClick={() => onClickTagItem({ name: "대구 달서구", type: "region" })}>대구 달서구</li>
            <li className="item" onClick={() => onClickTagItem({ name: "대구 북구", type: "region" })}>대구 북구</li>
            <li className="item" onClick={() => onClickTagItem({ name: "대구 중구", type: "region" })}>대구 중구</li>
          </ul>
        </div>
      </>
    ),
  ]);
  const tfFrame = new Frame([
    (
      <section className="tf-frame tf-frame-1">
        <header className="header">
          <h1 className="title">Search</h1>
          <div className="right" />
        </header>
        <div className="tf" onClick={() => tfHandler(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} readOnly />
        </div>
        <div className="history-list-group">
          <h3 className="subheader">검색 기록</h3>
          <ul className="list">
            <li className="item">
              <TagList dataList={[ "한식", {name: "서울", type: "region"}]} />
              <button className="button button-delete-item">
                <div className="icon"><CloseIcon /></div>
              </button>
            </li>
            <li className="item">
              <TagList dataList={[ "짬뽕", {name: "성남 분당구", type: "region"}, {name: "수원 팔달구 우만동", type: "region"} ]} />
              <button className="button button-delete-item">
                <div className="icon"><CloseIcon /></div>
              </button>
            </li>
            <li className="item">
              <TagList dataList={[ "스시", "마라탕", {name: "천안", type: "region"} ]} />
              <button className="button button-delete-item">
                <div className="icon"><CloseIcon /></div>
              </button>
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
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        {tagFrame.view()}

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
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <div className="tf-box" onClick={() => tfHandler(1)}>
            <TagList dataList={tagController.tags} />
          </div>
        </div>
      </section>
    ),
  ]);

  return <aside className="drawer">{tfFrame.view()}</aside>;
};



const SearchContent = forwardRef((_, ref) => {
  const InitContent = () => <></>;
  
  const [content, setContent] = useState(<InitContent />);
  const show = ({ content=<InitContent /> }) => setContent(content);
  useImperativeHandle(ref, () => ({ show: show, }));

  return <main className="content">{content}</main>;
});

const SearchPage = ({}) => {
  const contentRef = useRef();

  return (
    <div id="page">
      <header className="header" />
      <Drawer contentRef={contentRef} />
      <SearchContent ref={contentRef} />
    </div>
  );
};


export default SearchPage;
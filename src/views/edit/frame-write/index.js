import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Frame, getDistance } from "../../../util";
import { PostModel } from "../../../models";
import { PostViewModel } from "../../../view-models";

import TagList, { TagController } from "../../../components/tag-list";
import ImageGrid from "../../../components/image-grid";
import BackdropTag from "../backdrop-tag";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import AddAPhotoBorder from "../../../asset/icons/mui/add-a-photo-icon-border";
import { useSelector } from "react-redux";
import { createPost } from "../../../models/apis";


const FloatController = ({ floatRef, frame, createPost }) => {
  const navigate = useNavigate();

  const headerFrame = new Frame(), footerFrame = new Frame();
  const Header = () => {
    headerFrame.init([]);
    return <div className="float-header">{headerFrame.view()}</div>;
  };
  const Footer = () => {
    footerFrame.init([
      ( // main
        <section className="float-footer-frame frame-1">
          <button className="button button-add-image right" onClick={() => {}}>
            <div className="icon"><AddAPhotoBorder /></div>
            <p>사진 추가</p>
          </button>
        </section>
      ),
    ]);
    return <div className="float-footer">{footerFrame.view()}</div>;
  }

  const Top = () => (
    <nav className="float-top top-nav">
      <button className="button button-back" onClick={() => frame.walk(-3)}>
        <div className="icon"><ArrowBackIcon /></div>
      </button>
      <h3 className="title">리뷰 작성</h3>
      <button className="button button-next" onClick={() => {
        createPost();
        navigate(`/me`);
      }}>게시</button>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />), floatRef.current?.setFooter(<Footer />), floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setHeader(), floatRef.current?.setFooter(), floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


// frame 4
const FrameWrite = ({ frame, floatRef, backdropRef, getShopData, setContent, getTags, setTags, createPost }) => {
  const location = useSelector(state => state.global.location);
  const [ shopData, setShopData ] = useState({});

  const ImageGridTrailer = ({ shopData }) => (
    <div className="image-grid-trailer">
      <div className="content">
        <div className="text-wrap">
          <p className="name">{shopData.shopName}</p>
          <p className="address">{shopData.shopAddress}</p>
        </div>
      </div>
      <div className="image" style={{ backgroundImage: `url(${shopData.shopThumbUrl})` }} />
    </div>
  );

  const textRef = useRef();
  const handleResizeHeight = () => {
    const obj = textRef.current;
    obj.style.height = '1px';
    obj.style.height = obj.scrollHeight + 'px';
  };
  useEffect(() => {
    handleResizeHeight();
    setShopData(getShopData());
  }, []);
  // TAG
  const tagController = new TagController(["맥주", "호프"]);
  useEffect(() => {
    console.log(tagController.tags);
    // setTags(...)
  }, [tagController.tags]);
  //

  const showBackdropTag = () => backdropRef.current?.show({ title: "태그 추가", content: <BackdropTag tagController={tagController} /> });

  return (
    <>
      <main className="content">
        <article className="post editable">
          <header className="header">
            <div className="row row-shop">
              <button className="shop">
                <div className="thumb" style={{ backgroundImage: `url(${shopData.shopThumbUrl})` }} />
                <div className="text-wrap">
                  <p className="name">{shopData.shopName}</p>
                  <p className="description">{shopData.shopThumbAddress} · {getDistance(location, {
                    lati: shopData.lati,
                    longi: shopData.longi,
                  })}km</p>
                </div>
              </button>
            </div>
            <nav className="row row-tags">
              <TagList dataList={tagController.tags} small />
              <div className="buttons right">
                <button className="button text-button" onClick={() => showBackdropTag()}>태그 추가</button>
              </div>
            </nav>
          </header>

          <main className="body">
            <div className="row row-text">
              <textarea className="text" ref={textRef} onChange={({ target }) => {
                setContent(target.value);
                handleResizeHeight();
              }} name="text" placeholder="내용을 입력하세요" autoFocus />
              {/*data.postText*/}
            </div>
            <div className="row row-images">
              <ImageGrid images={[]} trailer={<ImageGridTrailer shopData={[]} />} editable />
            </div>
          </main>
        </article>
      </main>

      <FloatController floatRef={floatRef} frame={frame} createPost={createPost} />
    </>
  )
};

export default FrameWrite;
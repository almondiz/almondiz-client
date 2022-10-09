import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Frame } from "../../../util";
import { PostModel } from "../../../models";
import { PostViewModel } from "../../../view-models";

import TagList, { TagController } from "../../../components/tag-list";
import ImageGrid from "../../../components/image-grid";
import BackdropTag from "../backdrop-tag";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import AddAPhotoBorder from "../../../asset/icons/mui/add-a-photo-icon-border";


const FloatController = ({ floatRef, frame }) => {
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
          <button className="button-add-image right" onClick={() => {}}>
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
      <button className="button-back icon-sm" onClick={() => frame.walk(-3)}>
        <ArrowBackIcon />
      </button>
      <h3 className="title">리뷰 작성</h3>
      <button className="button-next" onClick={() => navigate(`/me`)}>게시</button>
    </nav>
  );

  useEffect(() => {
    (floatRef.current?.setHeader(<Header />), floatRef.current?.setFooter(<Footer />), floatRef.current?.setTop(<Top />));
    return () => (floatRef.current?.setHeader(), floatRef.current?.setFooter(), floatRef.current?.setTop());
  }, [floatRef.current]);

  return <></>;
};


// frame 4
const FrameWrite = ({ frame, floatRef, backdropRef }) => {
  // POST API
  const data = (postId => {
    const postViewModel = new PostViewModel(new PostModel());
    return postViewModel.getData(postId);
  })(1);
  //

  const ImageGridTrailer = ({ data }) => (
    <div className="grid trailer" style={{ gridArea: `grid-${data.postImageUrls.length + 1}` }}>
      <div className="content">
        <div className="text-wrap">
          <p className="name">{data.shopName}</p>
          <p className="address">{data.shopAddress}</p>
        </div>
      </div>
      <div className="image" style={{ backgroundImage: `url(${data.shopThumbUrl})` }} />
    </div>
  );
  

  const textRef = useRef();
  const handleResizeHeight = () => {
    const obj = textRef.current;
    obj.style.height = '1px';
    obj.style.height = obj.scrollHeight + 'px';
  };
  useEffect(() => handleResizeHeight(), []);

  // TAG
  const tagController = new TagController(data.postTags);
  useEffect(() => {
    console.log(tagController.tags);
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
                <div className="thumb" style={{ backgroundImage: `url(${data.shopThumbUrl})` }} />
                <div className="text-wrap">
                  <p className="name">{data.shopName}</p>
                  <p className="description">{data.shopAddress} · {data.shopDistance}</p>
                </div>
              </button>
            </div>
            <nav className="row row-tags">
              <TagList dataList={tagController.tags} small />
              <div className="buttons right">
                <button className="button-add-tag text-button" onClick={() => showBackdropTag()}>태그 추가</button>
              </div>
            </nav>
          </header>

          <main className="body">
            <div className="row row-text">
              <textarea className="text" ref={textRef} onChange={handleResizeHeight} name="text" placeholder="내용을 입력하세요" autoFocus />
              {/*data.postText*/}
            </div>
            <div className="row row-images">
              <ImageGrid images={data.postImageUrls} trailer={<ImageGridTrailer data={data} />} editable />
            </div>
          </main>
        </article>
      </main>

      <FloatController floatRef={floatRef} frame={frame} />
    </>
  )
};

export default FrameWrite;
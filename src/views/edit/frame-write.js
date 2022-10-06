import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Frame } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import ImageGrid from "../../components/image-grid";
import BackdropTag from "./backdrop-tag";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import AddAPhotoBorder from "../../asset/icons/mui/add-a-photo-icon-border";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";


const makeTag = (tag, idx) => <li key={idx} className="tag">{tag}</li>;


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
            <div className="icon-sm"><AddAPhotoBorder /></div>
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
  const postViewModel = new PostViewModel(new PostModel());
  const post = postViewModel.getData(1);

  const textRef = useRef();
  const handleResizeHeight = () => {
    const obj = textRef.current;
    obj.style.height = '1px';
    obj.style.height = obj.scrollHeight + 'px';
  };
  useEffect(() => handleResizeHeight(), []);

  const showBackdropTag = () => backdropRef.current?.show({ title: "태그 추가", content: <BackdropTag />, });

  return (
    <>
      <main className="content">
        <article className="post">
          <header className="header">
            <a href={post.shop.link} className="shop">
              <div className="thumb" style={{ backgroundImage: `url(${post.shop.thumb})` }} />
              <div className="text-wrap">
                <p className="name">{post.shop.name}</p>
                <p className="date">{post.shop.location.address}</p>
              </div>
            </a>
          </header>
    
          <nav className="tags-wrap">
            <SellIconBorder />
            <ul className="tags">{post.tags.map(makeTag)}</ul>
            <button className="text-button right" onClick={() => showBackdropTag()}>태그 추가</button>
          </nav>

          <main className="body">
            <textarea className="text" ref={textRef} onChange={handleResizeHeight} name="text" placeholder="내용을 입력하세요" autoFocus />
            <div className="images full">
              <ImageGrid images={post.content.images} shop={post.shop} />
            </div>
          </main>
        </article>
      </main>

      <FloatController floatRef={floatRef} frame={frame} />
    </>
  )
};

export default FrameWrite;
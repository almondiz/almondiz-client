import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Frame } from "../../../util";

import TagList from "../../../components/tag-list";
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
    return <div className="float-footer light">{footerFrame.view()}</div>;
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
const FrameWrite = ({ frame, floatRef, backdropRef, getShop, createPost }) => {
  const [ shop, setShop ] = useState({});
  const [ postTags, setPostTags ] = useState([]);
  const [ postText, setPostText ] = useState("");
  const [ postImageUrls, setPostImageUrls ] = useState([]);
  useEffect(() => {
    const { shopId, shopName, shopThumbUrl, shopAddress, tags } = getShop();
    setShop({ shopId, shopName, shopThumbUrl, shopAddress });
    setPostTags(tags);
  }, []);
  useEffect(() => {
    console.log(postTags);
  }, [postTags]);

  // textarea
  const textRef = useRef();
  const handleResizeHeight = () => {
    const obj = textRef.current;
    obj.style.height = '1px';
    obj.style.height = obj.scrollHeight + 'px';
  };
  useEffect(() => { handleResizeHeight(); }, []);

  const ImageGridTrailer = ({ shop }) => (
    <div className="image-grid-trailer">
      <div className="content">
        <div className="text-wrap">
          <p className="name">{shop.shopName}</p>
          <p className="address">{shop.shopAddress}</p>
        </div>
      </div>
      <div className="image" style={{ backgroundImage: `url(${shop.shopThumbUrl})` }} />
    </div>
  );
  const showBackdropTag = () => {
    backdropRef.current?.show({
      title: "태그 추가",
      content: <BackdropTag shop={shop} postTags={postTags} setPostTags={setPostTags} />,
    });
  };

  return (
    <>
      <main className="content">
        <article className="post editable">
          <header className="header">
            <div className="row row-shop">
              <button className="shop">
                <div className="thumb" style={{ backgroundImage: `url(${shop.shopThumbUrl})` }} />
                <div className="text-wrap">
                  <p className="name">{shop.shopName}</p>
                  <p className="description">{shop.shopAddress}</p>
                </div>
              </button>
            </div>
            <nav className="row row-tags">
              <TagList tags={postTags} small />
              <div className="buttons right">
                <button className="button text-button" onClick={() => showBackdropTag()}>태그 추가</button>
              </div>
            </nav>
          </header>

          <main className="body">
            <div className="row row-text">
              <textarea className="text" ref={textRef} onChange={({ target }) => {
                setPostText(target.value);
                handleResizeHeight();
              }} name="text" placeholder="내용을 입력하세요" autoFocus />
              {/*postText*/}
            </div>
            <div className="row row-images">
              <ImageGrid images={postImageUrls} trailer={<ImageGridTrailer shop={shop} />} editable />
            </div>
          </main>
        </article>
      </main>

      <FloatController floatRef={floatRef} frame={frame} createPost={createPost} />
    </>
  )
};

export default FrameWrite;
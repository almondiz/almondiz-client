import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import ImageGrid from "../../components/image-grid";

import "./style.scoped.scss";
import ArrowBackIcon from "../../asset/icons/mui/arrow-back-icon";
import AddAPhotoBorder from "../../asset/icons/mui/add-a-photo-icon-border";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";


const makeTag = (tag, idx) => (
  <li key={idx} className="tag">
    {tag}
    {/*<button className="tag-cancel-button"><CloseIcon /></button>*/}
  </li>
);


const Float = () => {
  const Footer = () => {
    const framer = new Framer([
      // main frame
      (
        <section className="frame-main">
          <button className="button-add-image right" onClick={() => {}}>
            <div className="icon-sm">
              <AddAPhotoBorder />
            </div>
            <p>사진 추가</p>
          </button>
        </section>
      ),
    ]);

    const scrollDirection = useSelector(state => state.global.scrollDirection);
    return (
      <footer className={`footer ${scrollDirection === -1 ? "hide" : ""}`}>
        {framer.view()}
      </footer>
    );
  };

  return (
    <aside className="float">
      <Footer />
    </aside>
  )
};


// frame 4
const FrameWrite = ({ framer }) => {
  const navigate = useNavigate();

  const postViewModel = new PostViewModel(new PostModel());
  const post = postViewModel.getData(1);

  const textRef = useRef();
  const handleResizeHeight = () => {
    const obj = textRef.current;
    obj.style.height = '1px';
    obj.style.height = obj.scrollHeight + 'px';
  };
  useEffect(() => { handleResizeHeight(); });

  return (
    <>
      <Float />

      <nav className="navbar">
        <button className="button-back icon-sm" onClick={() => framer.walk(-3)}>
          <ArrowBackIcon />
        </button>
        <h3 className="title">리뷰 작성</h3>
        <button className="button-next" onClick={() => navigate(`/me`)}>
          등록
        </button>
      </nav>

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
    
          <nav className="tag-wrap">
            <SellIconBorder />
            <ul className="tags">{post.tags.map(makeTag)}</ul>
            <button className="text-button right" onClick={() => framer.next()}>태그 추가</button>
          </nav>

          <main className="body">
            <textarea className="text" ref={textRef} onChange={handleResizeHeight} name="text" placeholder="내용을 입력하세요" autoFocus />
            <div className="images full">
              <ImageGrid images={post.content.images} shop={post.shop} />
            </div>
          </main>
        </article>
      </main>
    </>
  )
};

export default FrameWrite;
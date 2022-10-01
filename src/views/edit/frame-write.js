import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Framer } from "../../util";
import { PostModel } from "../../models";
import { PostViewModel } from "../../view-models";

import ImageGrid from "../../components/image-grid";

import "./style.scoped.scss";
import BackIcon from "../../asset/icons/mui/back-icon";
import AddAPhotoBorder from "../../asset/icons/mui/add-a-photo-icon-border";
import SellIconBorder from "../../asset/icons/mui/sell-icon-border";


const makeTag = (tag, idx) => (<li key={idx} className="tag">{tag}</li>);


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
const FrameWriter = ({ framer }) => {
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
          <BackIcon />
        </button>
        <h3 className="title">리뷰 작성</h3>
        <button className="button-next" onClick={() => framer.next()}>
          다음
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
            <SellIconBorder height="1.25rem" fill="#999" />
            <ul className="tags">{post.tags.map(makeTag)}</ul>
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

export default FrameWriter;
import React, { useState, useRef } from "react";

import TagList from "../../components/tag-list";
import CommentList from "../../components/comment-list";
import ImageSlider from "../image-slider";
import ImageGrid from "../../components/image-grid";
import ImageViewer from "../../components/image-viewer";

import "./style.scoped.scss";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


const PostItem = ({ data, detail=false }) => {
  const imageViewerRef = useRef();
  const imageGridAction = index => imageViewerRef.current?.setIndex(index);
  const ImageGridTrailer = ({ data }) => (
    <div onClick={data.goToShopPage} className="grid trailer" style={{ gridArea: `grid-${data.postImageUrls.length + 1}` }}>
      <div className="content">
        <div className="text-wrap">
          <p className="name">{data.shopName}</p>
          <p className="address">{data.shopAddress}</p>
        </div>
        <div className="icon"><NavigateNextIcon /></div>
      </div>
      <div className="image" style={{ backgroundImage: `url(${data.shopThumbUrl})` }} />
    </div>
  );

  const ButtonMore = ({ data }) => {
    const [focus, setFocus] = useState(false);
    const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-more ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };
  const ButtonScrap = ({ data }) => {
    const [focus, setFocus] = useState(data.scrap);
    const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-scrap ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon">{focus ? <BookmarkIconFill /> : <BookmarkIconBorder />}</div>
        <p>{data.scrappedCount}</p>
      </button>
    );
  };

  return (
    <article className={`post ${!detail ? "post-item" : ""}`} data-id={data.postId}>
      {!detail && <div className="background" onClick={data.goToPostPage} />}
      {detail && <ImageViewer images={data.postImageUrls} ref={imageViewerRef} />}

      <header className="header">
        <div className="row row-shop">
          <button className="shop" onClick={data.goToShopPage}>
            <div className="thumb" style={{ backgroundImage: `url(${data.shopThumbUrl})` }} />
            <div className="text-wrap">
              <p className="name">{data.shopName}</p>
              <p className="description">{data.shopAddress} · {data.shopDistance}</p>
            </div>
          </button>
          {!detail && (
            <div className="buttons right">
              <ButtonMore data={data} />
            </div>
          )}
        </div>
        <nav className="row row-tags"><TagList dataList={data.postTags} small /></nav>
      </header>

      <main className="body">
        <div className="row row-text">
          <p className="text">{data.postText}</p>
        </div>
        { 
          !detail ?
          (
            <div className="row row-images" onClick={data.goToPostPage}>
              <ImageSlider images={data.postImageUrls} />
            </div>
          ) :
          (
            <div className="row row-images">
              <ImageGrid images={data.postImageUrls} trailer={<ImageGridTrailer data={data} />} action={imageGridAction} />
            </div>
          )
        }
      </main>

      {
        !detail ?
        (
          data.commentCount && (
            <footer className="footer">
              <div className="row row-profile">
                <button className="profile" onClick={data.goToPostAuthorPage}
                  data-type={data.postAuthorType}
                >
                  <p className="emoji">{data.postAuthorEmoji}</p>
                  <p className="name">{data.postAuthorName}</p>
                </button>
                <p className="description">{data.postCreatedAt}</p>
                <div className="buttons right">
                  <ButtonScrap data={data} />
                </div>
              </div>
              <div className="row row-counts">
                <p className="description">댓글 <span className="count">{data.commentCount}</span></p>
                <div className="best-comment">
                  <p className="emoji">{data.bestCommentAuthorEmoji}</p>
                  <p className="text">{data.bestCommentText}</p>
                </div>
              </div>
            </footer>
          )
        ) :
        (
          <footer className="footer">
            <div className="row row-profile">
              <button
                className="profile"
                onClick={data.goToPostAuthorPage}
              >
                <p className="emoji">{data.postAuthorEmoji}</p>
                <p className="name">{data.postAuthorName}</p>
              </button>
              <p className="description right">{data.postCreatedAt}</p>
            </div>
            <div className="row row-counts">
              <p className="description">댓글 <span className="count">{data.commentCount}</span> · 스크랩 <span className="count">{data.scrappedCount}</span></p>
            </div>
            <div className="row row-comments"><CommentList dataList={data.comments} root={true} /></div>
          </footer>
        )
      }
    </article>
  );
}

export default PostItem;
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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


const PostItem = ({ post={}, detail=false, comments=[] }) => {
  const navigate = useNavigate();

  const imageViewerRef = useRef();
  const imageGridAction = index => imageViewerRef.current?.setIndex(index);
  const ImageGridTrailer = ({ post }) => (
    <div className="image-grid-trailer" onClick={() => post.goToShopPage(navigate)}>
      <div className="content">
        <div className="text-wrap">
          <p className="name">{post.shopName}</p>
          <p className="address">{post.shopAddress}</p>
        </div>
        <div className="icon"><NavigateNextIcon /></div>
      </div>
      <div className="image" style={{ backgroundImage: `url(${post.shopThumbUrl})` }} />
    </div>
  );

  const ButtonMore = ({ post }) => {
    const [focus, setFocus] = useState(false);
    const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-more ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };
  const ButtonScrap = ({ post }) => {
    const [focus, setFocus] = useState(post.scrap);
    const onClick = () => setFocus(!focus);
    return (
      <button className={`button button-scrap ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon">{focus ? <BookmarkIconFill /> : <BookmarkIconBorder />}</div>
        <p>{post.scrappedCount}</p>
      </button>
    );
  };

  const getRelationText = () => {
    if (post.postAuthorRelation === "following")
      return ` · 구독`;
    else
      return "";
  };

  return (
    <article className={`post ${!detail ? "post-item" : ""}`} data-post-id={post.postId}>
      {!detail && <div className="background" onClick={() => post.goToPostPage(navigate)} />}
      {detail && <ImageViewer imageUrls={post.postImageUrls} ref={imageViewerRef} />}

      <header className="header">
        <div className="row row-shop">
          <button className="shop" onClick={() => post.goToShopPage(navigate)}>
            <div className="thumb" style={{ backgroundImage: `url(${post.shopThumbUrl})` }} />
            <div className="text-wrap">
              <p className="name">{post.shopName}</p>
              <p className="description">{post.shopAddress} · {post.shopDistance}</p>
            </div>
          </button>
          {!detail && (
            <div className="buttons right">
              <ButtonMore post={post} />
            </div>
          )}
        </div>
        <nav className="row row-tags"><TagList dataList={post.postTags} small /></nav>
      </header>

      <main className="body">
        <div className="row row-text">
          <p className="text">{post.postText}</p>
        </div>
        { 
          !detail ?
          (
            <div className="row row-images" onClick={() => post.goToPostPage(navigate)}>
              <ImageSlider imageUrls={post.postImageUrls} />
            </div>
          ) :
          (
            <div className="row row-images">
              <ImageGrid imageUrls={post.postImageUrls} trailer={<ImageGridTrailer post={post} />} action={imageGridAction} />
            </div>
          )
        }
      </main>

      {
        !detail ?
        (
          <footer className="footer">
            <div className="row row-profile">
              <button className="profile" onClick={() => post.goToPostAuthorPage(navigate)} data-user-relation={post.postAuthorRelation}>
                <p className="emoji">{post.postAuthorEmoji}</p>
                <p className="name">{post.postAuthorName}</p>
              </button>
              <p className="description">{post.postCreatedAt}{getRelationText()}</p>
              <div className="buttons right">
                <ButtonScrap post={post} />
              </div>
            </div>
            { (post.commentCount > 0) && (
              <div className="row row-counts">
                <p className="description">댓글 <span className="count">{post.commentCount}</span></p>
                <div className="best-comment">
                  <p className="emoji">{post.bestCommentAuthorEmoji}</p>
                  <p className="text">{post.bestCommentText}</p>
                </div>
              </div>
            )}
          </footer>
        ) :
        (
          <footer className="footer">
            <div className="row row-profile">
              <button className="profile" onClick={() => post.goToPostAuthorPage(navigate)}>
                <p className="emoji">{post.postAuthorEmoji}</p>
                <p className="name">{post.postAuthorName}</p>
              </button>
              <p className="description right">{post.postCreatedAt}{getRelationText()}</p>
            </div>
            <div className="row row-counts">
              <p className="description">댓글 <span className="count">{post.commentCount}</span> · 스크랩 <span className="count">{post.scrappedCount}</span></p>
            </div>
            <div className="row row-comments"><CommentList comments={comments} root={true} /></div>
          </footer>
        )
      }
    </article>
  );
}

export default PostItem;
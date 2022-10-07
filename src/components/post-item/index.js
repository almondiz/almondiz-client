import React, { useRef } from "react";

import TagList from "../../components/tag-list";
import CommentList from "../../components/comment-list";
import ImageSlider from "../image-slider";
import ImageGrid from "../../components/image-grid";
import ImageViewer from "../../components/image-viewer";

import "./style.scoped.scss";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";


const PostItem = ({ data, detail=false }) => {
  let imageViewerRef;
  let imageGridAction;
  if (detail) {
    imageViewerRef = useRef();
    imageGridAction = index => imageViewerRef.current?.setIndex(index);
  }
  

  return (
    <article className={detail ? "post" : "post-item"}>
      { !detail && <div className="background" onClick={data.goToPostPage} /> }
      { detail && <ImageViewer images={data.postImageUrls} ref={imageViewerRef} /> }

      <header className="header">
        <div className="row row-shop">
          <button className="shop" onClick={data.goToShopPage}>
            <div className="thumb" style={{ backgroundImage: `url(${data.shopThumbUrl})` }} />
            <div className="text-wrap">
              <p className="name">{data.shopName}</p>
              <p className="description">{data.shopAddress} · {data.shopDistance}</p>
            </div>
          </button>
          { !detail && (
            <div className="buttons right">
              <button className="button button-more">
                <div className="icon"><MoreHorizIcon /></div>
              </button>
            </div>
          )}
        </div>
        <nav className="row row-tags"><TagList dataList={data.postTags} /></nav>
      </header>

      <main className="body">
        <p className="row row-text">{data.postText}</p>
        { 
          !detail ?
          (
            <div className="row row-images" onClick={data.goToPostPage}>
              <ImageSlider images={data.postImageUrls} />
            </div>
          ) :
          (
            <div className="row row-images">
              <ImageGrid images={data.postImageUrls} shop={data.shop} action={imageGridAction} />
            </div>
          )
        }
      </main>

      <footer className="footer">
        <div className="row row-profile">
          <button
            className={`profile ${data.postAuthorType} ${data.isPostAuthorFollowing ? "following" : ""}`}
            onClick={data.goToPostAuthorPage}
          >
            <p className="emoji">{data.postAuthorEmoji}</p>
            <p className="name">{data.postAuthorName}</p>
          </button>
          <p className="description">{data.postCreatedAt}</p>
          <div className="buttons right">
            <button className="button button-scrap">
              <div className="icon"><BookmarkIconBorder /></div>
              <p className="count">{data.scrappedCount}</p>
            </button>
          </div>
        </div>
        {
          !detail ?
          (
            data.commentCount && (
              <div className="row row-counts">
                <p className="description">댓글 <span className="count">{data.commentCount}</span></p>
                <div className="best-comment">
                  <p className="emoji">{data.bestCommentAuthorEmoji}</p>
                  <p className="text">{data.bestCommentText}</p>
                </div>
              </div>
            )
          ) :
          (
            <>
              <div className="row row-counts">
                <p className="description">댓글 <span className="count">{data.commentCount}</span> · 스크랩 <span className="count">{data.scrappedCount}</span></p>
              </div>
              <div className="row row-comments"><CommentList dataList={data.comments} root={true} /></div>
            </>
          )
        }
      </footer>
    </article>
  );
}

export default PostItem;
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs } from "../../util";
import TagList from "../../components/tag-list";
import CommentList from "../../components/comment-list";
import ImageSlider from "../image-slider";
import ImageGrid from "../../components/image-grid";
import ImageViewer from "../../components/image-viewer";
import { showModalFormMenuList, showModalFormConfirm } from "../../components/modal";

import "./style.scoped.scss";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


export const popPost = (posts, setPosts, idx) => {
  const _posts = [...posts];
  _posts.splice(idx, 1);
  setPosts(_posts);
};

const PostItem = ({ post={}, detail=false, comments=[], popPost }) => {
  const navigate = useNavigate();

  const { toastRef } = StaticComponentRefs;


  const modifyPost = () => {
    const { postId } = post;
    toastRef?.current?.log("수정 화면으로 이동합니다.");
    navigate(`/edit`, { state: { postId } });
  };
  const deletePost = async () => {
    const success = await post.delete();
    if (success) {
      toastRef?.current?.log("글를 삭제했습니다.");
      if (detail)
        navigate(-1);
      else
        popPost();
    }
  };
  //const reportPost = async () => {};


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
    const { modalRef } = StaticComponentRefs;
    const modalFormMenuListRef = useRef();
    const modalFormConfirmRef = useRef();

    const onClickModalModify = () => modifyPost();
    const onClickModalDelete = () => {
      showModalFormConfirm(modalRef, modalFormConfirmRef, {
        title: "정말로 삭제하시겠어요?",
        callback: async (choice) => (choice && deletePost()),
      });
    };
    //const onClickModalReport = () => {};

    const onClick = () => {
      const myPostMenus = [
        { title: "수정하기", choice: "MODIFY", },
        { title: "삭제하기", choice: "DELETE", danger: true },
      ];
      const otherPostMenus = [
        { title: "구독", choice: "FOLLOW", },
        { title: "신고하기", choice: "REPORT", danger: true },
      ];
      const followingPostMenus = [
        { title: "구독 취소", choice: "UNFOLLOW", },
        { title: "신고하기", choice: "REPORT", danger: true },
      ];
      const menus = (() => {
        switch (post.postAuthorRelation) {
          case "me":          return myPostMenus;
          case "following":   return followingPostMenus;
          case "other":
          default:            return otherPostMenus;
        }
      })();
      showModalFormMenuList(modalRef, modalFormMenuListRef, {
        menus,
        callback: async (choice) => {
          switch (choice) {
            case "MODIFY":
              return onClickModalModify();
            case "DELETE":
              return onClickModalDelete();
            case "REPORT":
              return;//onClickModalReport();
          }
        },
      });
    };
    return (
      <button className="button button-more" onClick={onClick}>
        <div className="icon"><MoreHorizIcon /></div>
      </button>
    );
  };
  const ButtonScrap = ({ post }) => {
    const [focus, setFocus] = useState(post.isScrapped);
    const onClick = async () => {
      const b = !focus;
      const success = await post.scrap(b);
      if (success) {
        toastRef?.current?.log(b ? "스크랩되었습니다." : "스크랩이 취소되었습니다.");
        setFocus(b);
      }
    };
    return (
      <button className={`button button-scrap ${focus ? "focus" : ""}`} onClick={onClick}>
        <div className="icon">{focus ? <BookmarkIconFill /> : <BookmarkIconBorder />}</div>
        <p>{post.scrappedCount}</p>
      </button>
    );
  };
  const getRelationText = () => ((post.postAuthorRelation === "following") ? ` · 구독` : "");


  return (
    <article className={`post ${!detail ? "post-item" : ""}`} data-post-id={post.postId}>
      {!detail && <div className="background" onClick={() => post.goToPostPage(navigate)} />}
      {detail && <ImageViewer images={post.postImages} ref={imageViewerRef} />}

      <header className="header">
        <div className="row row-shop">
          <button className="shop" onClick={() => post.goToShopPage(navigate)}>
            <div className="thumb" style={{ backgroundImage: `url(${post.shopThumbUrl})` }} />
            <div className="text-wrap">
              <p className="name">{post.shopName}</p>
              {!detail ? (
                <p className="description">{post.shopAddress} · {post.shopDistance}</p>
              ) : (
                <p className="description">{post.shopAddress}</p>
              )}
            </div>
          </button>
          <div className="buttons right">
            <ButtonMore post={post} />
          </div>
        </div>
        <nav className="row row-tags">
          <TagList tags={post.postTags} onClickItem={idx => navigate(`/search/${post.postTags[idx].tagType}/${post.postTags[idx].tagId}`)} small />
        </nav>
      </header>

      <main className="body">
        <div className="row row-text">
          <p className="text">{!detail ? post.postTextHead : post.postText}</p>
        </div>
        { 
          !detail ?
          (
            <div className="row row-images" onClick={() => post.goToPostPage(navigate)}>
              <ImageSlider images={post.postImages} />
            </div>
          ) :
          (
            <div className="row row-images">
              <ImageGrid images={post.postImages} trailer={<ImageGridTrailer post={post} />} action={imageGridAction} />
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
            <div className="row row-counts">
              <p className="description">댓글 <span className="count">{post.commentCount}</span></p>
              { (post.commentCount > 0) && (
                <div className="best-comment">
                  <p className="emoji">{post.bestCommentAuthorEmoji}</p>
                  <p className="text">{post.bestCommentText}</p>
                </div>
              )}
            </div>
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
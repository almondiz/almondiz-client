import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs, Pipe } from "../../util";
import TagList from "../tag-list";
import CommentList from "../comment-list";
import ImageSlider from "../image-slider";
import ImageGrid from "../image-grid";
import ImageViewer from "../image-viewer";
import { showModalFormMenuList, showModalFormConfirm } from "../modal";

import "./style.scoped.scss";
import BookmarkIconBorder from "../../asset/icons/mui/bookmark-icon-border";
import BookmarkIconFill from "../../asset/icons/mui/bookmark-icon-fill";
import MoreHorizIcon from "../../asset/icons/mui/more-horiz-icon";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import NavigateNextIcon from "../../asset/icons/mui/navigate-next-icon";


// detail if posts !== null
const PostItem = ({ post, detail=false, comments, follow, unfollow, deletePost }) => {
  const navigate = useNavigate();
  const { toastRef } = StaticComponentRefs;
  

  const modifyPost = () => {
    const { postId } = post;
    toastRef?.current?.log("수정 화면으로 이동합니다.");
    navigate(`/edit`, { state: { postId } });
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
    const modalAliasContentRef = useRef();
    const ModalAliasContent = forwardRef(({ alias="" }, ref) => {
      // textfield
      const TF_PLACEHOLDER = "별명 지정";
      const [tf, setTf] = useState(alias);
      useImperativeHandle(ref, () => ({ tf }));
    
      return (
        <main className="modal-body area-alias-input">
          <div className="profile" data-user-relation={post.postAuthorRelation}>
            <div className="thumb" style={{ backgroundColor: post.postAuthorColor }}>{post.postAuthorEmoji}</div>
            <div className="text-wrap">
              <p className="name">{post.postAuthorName}</p>
              {(post.postAuthorRelation !== "other") && <p className="description">{post.postAuthorNameDescription}</p>}
            </div>
          </div>
          <div className="tf">
            <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
            <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
          </div>
          <p className="help">다음부터는 이 별명으로 보이게 됩니다.</p>
        </main>
      );
    });

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
    const onClickModalFollow = () => {
      showModalFormConfirm(modalRef, modalFormConfirmRef, {
        title: "구독 설정",
        body: <ModalAliasContent ref={modalAliasContentRef} />,
        callback: async (choice) => {
          if (choice) {
            const _alias = modalAliasContentRef.current?.tf;
            follow(_alias);
          }
        },
      });
    };
    const onClickModalUnfollow = () => {
      showModalFormConfirm(modalRef, modalFormConfirmRef, {
        title: "정말 구독을 취소하시겠어요?",
        callback: async (choice) => (choice && unfollow()),
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
            case "FOLLOW":
              return onClickModalFollow();
            case "UNFOLLOW":
              return onClickModalUnfollow();
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
    <article className={`post ${detail ? "post-detail" : ""}`} data-post-id={post.postId}>
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
};


export const PostOne = ({ post={}, setPost, userViewModel, commentViewModel }) => {
  const navigate = useNavigate();
  
  /** 1. USER API */
  const _updatePost = updatedFields => {
    const _post = { ...post, ...updatedFields };
    setPost(_post);
  };
  const follow = async (alias) => {
    const { postAuthorId } = post;
    const success = await userViewModel.follow(postAuthorId, alias);
    if (success) {
      const postAuthorName = alias;
      const { postAuthorName: postAuthorNameDescription } = post;
      _updatePost({ postAuthorRelation: "following", postAuthorName, postAuthorNameDescription });
    }
  };
  const unfollow = async () => {
    const { postAuthorId } = post;
    const success = await userViewModel.unfollow(postAuthorId);
    if (success) {
      const { postAuthorNameDescription: postAuthorName } = post;
      const postAuthorNameDescription = undefined;
      _updatePost({ postAuthorRelation: "other", postAuthorName, postAuthorNameDescription });
    }
  };
  const deletePost = async () => {
    const success = await post.delete();
    if (success) {
      toastRef?.current?.log("글을 삭제했습니다.");
      setPost(null);
      navigate(-1);
    }
  };
  /** */
  /** 5-0. COMMENT API */
  const [comments, setComments] = useState(null);
  const readAllComments = async () => {
    if (!post)  return;
    const { postId, postAuthorId } = post;
    setComments(await commentViewModel.readAllComments(postId, { postAuthorId }));
  };
  useEffect(() => { readAllComments(); }, [post]);
  /** */

  Pipe.set("comments", { refresh: readAllComments });

  return (comments) && (
    <PostItem
      post={post} detail={true} comments={comments}
      follow={follow} unfollow={unfollow} deletePost={deletePost}
    />
  );
};
const PostList = ({ posts=[], setPosts, userViewModel }) => {
  /** 1. USER API */
  const _updatePosts = (postAuthorId, updatedFields) => {
    const _posts = posts.map((post, idx) => {
      if (post.postAuthorId === postAuthorId)
        return { ...post, ...updatedFields };
      else
        return post;
    });
    setPosts(_posts);
  };
  const follow = async (idx, alias) => {
    const { postAuthorId } = posts[idx];
    const success = await userViewModel.follow(postAuthorId, alias);
    if (success) {
      const postAuthorName = alias;
      const { postAuthorName: postAuthorNameDescription } = posts[idx];
      _updatePosts(postAuthorId, { postAuthorRelation: "following", postAuthorName, postAuthorNameDescription });
    }
  };
  const unfollow = async (idx) => {
    const { postAuthorId } = posts[idx];
    const success = await userViewModel.unfollow(postAuthorId);
    if (success) {
      const { postAuthorNameDescription: postAuthorName } = posts[idx];
      const postAuthorNameDescription = undefined;
      _updatePosts(postAuthorId, { postAuthorRelation: "other", postAuthorName, postAuthorNameDescription });
    }
  };
  const deletePost = async (idx) => {
    const success = await posts[idx].delete();
    if (success) {
      toastRef?.current?.log("글을 삭제했습니다.");
      const _posts = [...posts];
      _posts.splice(idx, 1);
      setPosts(_posts);
    }
  };
  /** */

  return (
    <section className="post-list">
      {posts.map((post, idx) => (
        <PostItem key={idx}
          post={post} detail={false}
          follow={alias => follow(idx, alias)} unfollow={() => unfollow(idx)} deletePost={() => deletePost(idx)}
        />
      ))}
    </section>
  );
};
export default PostList;
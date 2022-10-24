import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { StaticComponentRefs, Frame, filterText } from "../../../util";

import TagList from "../../../components/tag-list";
import ImageGrid from "../../../components/image-grid";
import BackdropTag from "../backdrop-tag";

import "./style.scoped.scss";
import ArrowBackIcon from "../../../asset/icons/mui/arrow-back-icon";
import AddAPhotoBorder from "../../../asset/icons/mui/add-a-photo-icon-border";


const FloatController = ({
  frame, createPost,
  postText, postImages, setPostImages,
}) => {
  const navigate = useNavigate();

  const Footer = ({ postImages }) => {
    const imageInputRef = useRef();
    const MAX_NUM_OF_IMAGES = 10;
    const onAddImageButtonClick = e => {
      if (postImages.length < MAX_NUM_OF_IMAGES) {
        imageInputRef.current?.click();
      } else {
        // #### Snackbar 컴포넌트
        console.error("[FrameWrite]", "한 게시물에서는 최대 10개까지만 이미지를 업로드할 수 있음.");
      }
    };
    const onImageChange = e => {
      setPostImages([...postImages, {
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      }]);
    };

    const footerFrame = new Frame();
    footerFrame.init([
      ( // main
        <section className="float-footer-frame frame-1">
          <button className="button button-add-image right" onClick={onAddImageButtonClick}>
            <div className="icon"><AddAPhotoBorder /></div>
            <p>사진 추가</p>
          </button>

          <input ref={imageInputRef} type="file" accept="image/*" name="file" onChange={onImageChange} className="input-add-image" />
        </section>
      ),
    ]);
    return <div className="float-footer color-light">{footerFrame.view()}</div>;
  };

  const Top = ({ postText }) => {
    const ButtonPublish = ({ postText }) => {
      const [ disabled, setDisabled ] = useState(true);
      useEffect(() => { setDisabled(filterText(postText) === ""); }, [postText]);
      const onClick = async () => {
        if (!disabled) {
          const success = await createPost();
          if (success) {
            navigate(`/me`);
          }
        }
      };
      return <button className="button button-next" disabled={disabled} onClick={onClick}>게시</button>;
    };
    return (
      <nav className="float-top top-nav">
        <button className="button button-back" onClick={() => frame.prev()}>
          <div className="icon"><ArrowBackIcon /></div>
        </button>
        <h3 className="title">리뷰 작성</h3>
        <ButtonPublish postText={postText} />
      </nav>
    );
  };

  const floatRef = StaticComponentRefs.floatRef;
  useEffect(() => {
    floatRef.current?.setFooter(<Footer postImages={postImages} />);
    return () => floatRef.current?.setFooter();
  }, [postImages]);
  useEffect(() => {
    floatRef.current?.setTop(<Top postText={postText} />);
    return () => floatRef.current?.setTop();
  }, [postText]);

  return <></>;
};


// frame 2
const FrameWrite = ({
  frame, createPost,
  shop,
  postTags, setPostTags,
  postText, setPostText,
  postImages, setPostImages,
  searchFoodTag, createFoodTag,
}) => {
  useEffect(() => { setPostTags([...shop.tags]); }, []);

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

  const backdropTagRef = useRef();
  const showBackdropTag = () => {
    const backdropRef = StaticComponentRefs.backdropRef;
    backdropRef.current?.show(
      <BackdropTag backdropRef={backdropRef} ref={backdropTagRef}
        shop={shop} postTags={postTags}
        searchFoodTag={searchFoodTag} createFoodTag={createFoodTag}
      />,
      async () => {
        const { tags } = backdropTagRef.current?.destruct();
        setPostTags([...tags]);
      }
    );
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
                <button className="button button-add-tag" onClick={() => showBackdropTag()}>태그 추가</button>
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
              <ImageGrid images={postImages} trailer={<ImageGridTrailer shop={shop} />} editable setImages={setPostImages} />
            </div>
          </main>
        </article>
      </main>

      <FloatController
        frame={frame} createPost={createPost}
        postText={postText} postImages={postImages} setPostImages={setPostImages}
      />
    </>
  )
};

export default React.memo(FrameWrite);
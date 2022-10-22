import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";

import { Frame, NoScroll } from "../../util";
import { PostViewModel, SearchViewModel } from "../../view-models";

import TagList, { pushTag } from "../../components/tag-list";
import PostItem from "../../components/post-item";

import "./style.scoped.scss";
import ArrowBackIosIcon from "../../asset/icons/mui/arrow-back-ios-icon";
import SearchIconBorder from "../../asset/icons/mui/search-icon-border";
import CancelIconFill from "../../asset/icons/mui/cancel-icon-fill";
import CloseIcon from "../../asset/icons/mui/close-icon";


const Drawer = ({ contentRef }) => {
  const scrollDirection = useSelector(state => state.global.scrollDirection);

  const PostList = () => {
    /** 4. POST API */
    const postViewModel = new PostViewModel();
    const [posts, setPosts] = useState([]);
    const readAllPosts = async () => setPosts(await postViewModel.readAllPosts());
    useEffect(() => { readAllPosts(); }, []);
    /** */
    
    return <section className="post-list">{posts.map((post, idx) => <PostItem key={idx} post={post} />)}</section>
  };

  // tag
  const [ tags, setTags ] = useState([]);
  const onClickTagItem = e => {
    pushTag(tags, setTags, e);
    setTf("");
  };

  // textfield
  const TF_PLACEHOLDER = "메뉴나 지역을 입력해 보세요";
  const [tf, setTf] = useState("");
  useEffect(() => { tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0); }, [tf]);
  const handleTf = tfFrameIndex => {
    tfFrame.move(tfFrameIndex);
    switch (tfFrameIndex) {
      case 0:
        setTf("");
        contentRef.current?.show({});
        break;
      case 1:
        setTf("");
        break;
      case 2:
        setTf("");
        contentRef.current?.show({ content: <PostList /> });
        break;
    }
  };

  /** 7. TAG API (DUMMY) */
  const [ historyResult, setHistoryResult ] = useState([
    [
      { tagType: "food", tagId: 1, tagName: "한식" },
      { tagType: "region", tagId: 6, tagName: "서울" },
    ],
    [
      { tagType: "food", tagId: 2, tagName: "짬뽕" },
      { tagType: "region", tagId: 7, tagName: "성남 분당구" }, { tagType: "region", tagId: 8, tagName: "수원 팔달구 우만동" },
    ],
    [
      { tagType: "food", tagId: 3, tagName: "스시" }, { tagType: "food", tagId: 4, tagName: "마라탕" },
      { tagType: "region", tagId: 9, tagName: "천안" },
    ],
  ]);
  const [ searchResult, setSearchResult ] = useState({
    foods: [
      { tagType: "food", tagId: 14, tagName: "대구" },
    ],
    regions: [
      { tagType: "region", tagId: 1, tagName: "대구" },
      { tagType: "region", tagId: 2, tagName: "대구 남구" },
      { tagType: "region", tagId: 3, tagName: "대구 달서구" },
      { tagType: "region", tagId: 4, tagName: "대구 북구" },
      { tagType: "region", tagId: 5, tagName: "대구 중구" },
    ],
  });
  /** */

  const tagFrame = new Frame([
    (
      <>
        <TagList tags={tags} editable setTags={setTags} />
        <button className="button button-search" onClick={() => handleTf(2)}>
          <div className="icon"><SearchIconBorder /></div>
          <p>검색하기</p>
        </button>
      </>
    ),
    (
      <>
        <div className="tag-list-group">
          <h3 className="subheader">음식</h3>
          <ul className="list">
            {searchResult.foods.map((tag, idx) => <li key={idx} className="item" onClick={() => onClickTagItem(tag)}>{tag.tagName}</li>)}
          </ul>
        </div>
        <div className="tag-list-group">
          <h3 className="subheader">지역</h3>
          <ul className="list">
            {searchResult.regions.map((tag, idx) => <li key={idx} className="item" onClick={() => onClickTagItem(tag)}>{tag.tagName}</li>)}
          </ul>
        </div>
      </>
    ),
  ]);

  const tfFrame = new Frame([
    (
      <section className="tf-frame tf-frame-1">
        <header className="header">
          <h1 className="title">Search</h1>
          <div className="right" />
        </header>
        <div className="tf" onClick={() => handleTf(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly />
        </div>
        <div className="history-list-group">
          <h3 className="subheader">검색 기록</h3>
          <ul className="list">
            {historyResult.map((tags, idx) => {
              const onClick = e => {
                setTags([...tags]);
                handleTf(2);
              };
              const onDeleteClick = e => {
                e.stopPropagation();
                const _historyResult = [...historyResult];
                _historyResult.splice(idx, 1);
                setHistoryResult(_historyResult);
              };

              return (
                <li key={idx} className="item" onClick={onClick}>
                  <TagList tags={tags} />
                  <button className="button button-delete-item" onClick={onDeleteClick}>
                    <div className="icon"><CloseIcon /></div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <NoScroll />
      </section>
    ), 
    (
      <section className="tf-frame tf-frame-2">
        <header className="header">
          <h1 className="title">Search</h1>
          <div className="right" />
        </header>
        <div className="tf">
          <button className="tf-icon" onClick={() => handleTf(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
          <button className={`tf-clear-button ${tf ? "" : "hide"}`} onClick={() => setTf("")}><CancelIconFill /></button>
        </div>
        {tagFrame.view()}

        <NoScroll />
      </section>
    ),
    (
      <section className={`tf-frame tf-frame-3 ${scrollDirection === 1 ? "hide" : ""}`}>
        <header className="header">
          <h1 className="title">Search</h1>
          <div className="right" />
        </header>
        <div className="tf light">
          <button className="tf-icon" onClick={() => handleTf(0)}><ArrowBackIosIcon /></button>
          <div className="tf-box" onClick={() => handleTf(1)}>
            <TagList tags={tags} />
          </div>
        </div>
      </section>
    ),
  ]);

  return <aside className="drawer">{tfFrame.view()}</aside>;
};



const SearchContent = forwardRef((_, ref) => {
  const InitContent = () => <></>;
  
  const [content, setContent] = useState(<InitContent />);
  const show = ({ content=<InitContent /> }) => setContent(content);
  useImperativeHandle(ref, () => ({ show: show, }));

  return <main className="content">{content}</main>;
});

const SearchPage = ({}) => {
  const contentRef = useRef();

  return (
    <div id="page">
      <header className="header" />
      <Drawer contentRef={contentRef} />
      <SearchContent ref={contentRef} />
    </div>
  );
};


export default SearchPage;
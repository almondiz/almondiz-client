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

  /** 4. POST API */
  const postViewModel = new PostViewModel();
  const PostList = ({ tags }) => {
    const [ posts, setPosts ] = useState([]);
    const searchPosts = async (tags) => setPosts(await postViewModel.readAllPosts());
    useEffect(() => { searchPosts(); }, []);
    return posts && (
      <section className="post-list">{posts.map((post, idx) => <PostItem key={idx} post={post} />)}</section>
    );
  };
  /** */

  /** 0. SEARCH API */
  const [ searchResult, setSearchResult ] = useState({});
  const searchViewModel = new SearchViewModel();
  const onSearchFullTag = async (tf) => {
    const _tags = await searchViewModel.searchFullTag(tf);
    if (_tags) {
      setSearchResult(_tags);
    } else {
      setSearchResult([]);
    }
  };

  const [ historyResult, setHistoryResult ] = useState([]);
  const readSearchHistory = async () => setHistoryResult(await searchViewModel.readSearchHistory());
  useEffect(() => { readSearchHistory(); }, []);
  const removeSearchHistory = async (idx) => {
    const success = await searchViewModel.removeSearchHistory(idx);
    if (success) {
      const _historyResult = [...historyResult];
      _historyResult.splice(idx, 1);
      setHistoryResult(_historyResult);
    }
  };
  /** */

  // textfield
  const TF_PLACEHOLDER = "메뉴나 지역을 입력해 보세요";
  const [tf, setTf] = useState("");
  useEffect(() => {
    tagFrame.move(tf ? 1 : 0);
    onSearchFullTag(tf);
  }, [tf]);
  const moveTf = tfFrameIndex => {
    tfFrame.move(tfFrameIndex);
    switch (tfFrameIndex) {
      case 0:
        setTf(""); setTags([]);
        contentRef.current?.show({});
        break;
      case 2:
        setTf("");
        contentRef.current?.show({ content: <PostList tags={tags} /> });
        break;
    }
  };

  // tag
  const [ tags, setTags ] = useState([]);
  const onSelectTagItem = _tag => {
    pushTag(tags, setTags, _tag);
    setTf("");
  };

  const TagSearchItem = ({ tag }) => (
    <li className="item" data-tag-type={tag.tagType} data-tag-id={tag.tagId} onClick={() => onSelectTagItem(tag)}>
      {tag.tagName}
    </li>
  );
  const tagFrame = new Frame([
    (
      <>
        <TagList tags={tags} editable setTags={setTags} />
        <button className="button button-search" onClick={(tags.length > 0) ? () => moveTf(2) : () => {}}>
          <div className="icon"><SearchIconBorder /></div>
          <p>검색하기</p>
        </button>
      </>
    ),
    (
      <>
        <div className="tag-list-group">
          <h3 className="subheader">음식</h3>
          <ul className="list">{searchResult.foods?.map((tag, idx) => <TagSearchItem key={idx} tag={tag} />)}</ul>
        </div>
        <div className="tag-list-group">
          <h3 className="subheader">지역</h3>
          <ul className="list">{searchResult.regions?.map((tag, idx) => <TagSearchItem key={idx} tag={tag} />)}</ul>
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
        <div className="tf" onClick={() => moveTf(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={TF_PLACEHOLDER} value={tf} readOnly />
        </div>
        <div className="history-list-group">
          <h3 className="subheader">검색 기록</h3>
          <ul className="list">
            {historyResult.map((tags, idx) => {
              const onClick = e => {
                setTags([...tags]);
                moveTf(2);
              };
              const onDeleteClick = e => {
                e.stopPropagation();
                removeSearchHistory(idx)
              };

              return (
                <li key={idx} className="item" onClick={onClick}>
                  <div className="tag-list-wrap"><TagList tags={tags} /></div>
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
          <button className="tf-icon" onClick={() => moveTf(0)}><ArrowBackIosIcon /></button>
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
          <button className="tf-icon" onClick={() => moveTf(0)}><ArrowBackIosIcon /></button>
          <div className="tf-box" onClick={() => moveTf(1)}>
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
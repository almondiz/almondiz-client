import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useSelector } from "react-redux";

import { Frame, NoScroll } from "../../util";
import { PostViewModel } from "../../view-models";

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
    /** 4-0. POST API */
    const postViewModel = new PostViewModel();
    const [posts, setPosts] = useState([]);
    const getAllPosts = async () => setPosts(await postViewModel.getAllPosts());
    useEffect(() => { getAllPosts(); }, []);
    /** */
    
    return <section className="post-list">{posts.map((post, idx) => <PostItem key={idx} post={post} />)}</section>
  };

  // tag
  const DUMMY_RECORD_TAGS_LIST = [
    [
      { tagType: "food", tagId: 1, tagName: "힌식" },
      { tagType: "region", tagName: "서울" },
    ],
    [
      { tagType: "food", tagId: 2, tagName: "짬뽕" },
      { tagType: "region", tagName: "성남 분당구" }, { tagType: "region", tagName: "수원 팔달구 우만동" },
    ],
    [
      { tagType: "food", tagId: 3, tagName: "스시" }, { tagType: "food", tagId: 4, tagName: "마라탕" },
      { tagType: "region", tagName: "천안" },
    ],
  ];
  const DUMMY_INIT_TAG_LIST = [
    { tagType: "food", tagId: 3, tagName: "맥주" },
    { tagType: "food", tagId: 4, tagName: "호프" },
    { tagType: "region", tagName: "대구" },
  ];
  const DUMMY_SEARCH_TAG_LIST = {
    foods: [
      { tagType: "food", tagId: 14, tagName: "대구" },
    ],
    regions: [
      { tagType: "region", tagName: "대구" },
      { tagType: "region", tagName: "대구 남구" },
      { tagType: "region", tagName: "대구 달서구" },
      { tagType: "region", tagName: "대구 북구" },
      { tagType: "region", tagName: "대구 중구" },
    ],
  };
  const [ tags, setTags ] = useState([...DUMMY_INIT_TAG_LIST]);
  const onClickTagItem = e => {
    pushTag(tags, setTags, e);
    setTf("");
  };
  
  // textfield
  const tfPlaceholder = "메뉴나 지역을 입력해 보세요";
  const [tf, setTf] = useState("");
  useEffect(() => { tagFrame.move((tfFrame.index === 1 && tf) ? 1 : 0); }, [tf]);
  const tfHandler = tfFrameIndex => {
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

  const tagFrame = new Frame([
    (
      <>
        <TagList tags={tags} editable setTags={setTags} />
        <button className="button button-search" onClick={() => tfHandler(2)}>
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
            {DUMMY_SEARCH_TAG_LIST.foods.map((tag, idx) => <li key={idx} className="item" onClick={() => onClickTagItem(tag)}>{tag.tagName}</li>)}
          </ul>
        </div>
        <div className="tag-list-group">
          <h3 className="subheader">지역</h3>
          <ul className="list">
            {DUMMY_SEARCH_TAG_LIST.regions.map((tag, idx) => <li key={idx} className="item" onClick={() => onClickTagItem(tag)}>{tag.tagName}</li>)}
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
        <div className="tf" onClick={() => tfHandler(1)}>
          <div className="tf-icon"><SearchIconBorder /></div>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} readOnly />
        </div>
        <div className="history-list-group">
          <h3 className="subheader">검색 기록</h3>
          <ul className="list">
            {DUMMY_RECORD_TAGS_LIST.map((tags, idx) => (
              <li key={idx} className="item">
                <TagList tags={tags} />
                <button className="button button-delete-item">
                  <div className="icon"><CloseIcon /></div>
                </button>
              </li>
            ))}
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
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <input className="tf-box" type="text" placeholder={tfPlaceholder} value={tf} onChange={e => setTf(e.target.value)} autoFocus />
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
          <button className="tf-icon" onClick={() => tfHandler(0)}><ArrowBackIosIcon /></button>
          <div className="tf-box" onClick={() => tfHandler(1)}>
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
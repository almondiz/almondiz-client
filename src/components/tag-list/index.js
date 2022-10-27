import React from "react";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";


const _tagCompareFn = (a, b) => {
  const tagTypeOrder = { "food": 1, "region": 2 };
  let ret = tagTypeOrder[a.tagType] - tagTypeOrder[b.tagType];
  if (ret === 0) {
    ret = (a.tagName).localeCompare(b.tagName);
  }
  return ret;
};

// valid on editable
export const pushTag = (tags, setTags, e) => {
  if (tags.find(tag => (tag.tagType === e.tagType && tag.tagId === e.tagId)) !== undefined)
    return false;
  const _tags = [...tags, e];
  _tags.sort(_tagCompareFn);
  setTags(_tags);
  return true;
};
export const popTag = (tags, setTags, idx) => {
  const _tags = [...tags];
  _tags.splice(idx, 1);
  setTags(_tags);
};


const TagItem = ({ tag, editable, onClick }) => {
  const { tagType="food", tagId, tagName } = tag;

  return (
    <li className="tag-item-wrap">
      <button className="tag-item" data-tag-type={tagType} data-tag-id={tagId} onClick={onClick}>
        <p className="name">{tagName}</p>
        {editable && (
          <div className="tag-delete-button">
            <div className="icon"><CloseIcon /></div>
          </div>
        )}
      </button>
    </li>
  );
};

const TagList = ({ tags=[], small=false, onClickItem=(() => {}), editable=false, setTags }) => {
  if (editable) {
    onClickItem = idx => popTag(tags, setTags, idx);
  }

  return (
    <ul className={`tag-list ${editable ? "editable" : ""} ${small ? "small" : ""}`}>
      {tags.map((tag, idx) => <TagItem key={idx} tag={tag} editable={editable} onClick={() => onClickItem(idx)} />)}
    </ul>
  );
};

export default TagList;
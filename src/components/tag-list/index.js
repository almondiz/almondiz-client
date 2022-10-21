import React from "react";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";


// valid on editable
export const pushTag = (tags, setTags, e) => {
  if (tags.find(tag => (tag.tagType === e.tagType && tag.tagId === e.tagId)) !== undefined)
    return false;
  setTags([...tags, e]);
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
    <button className="tag-item" data-tag-type={tagType} data-tag-id={tagId} onClick={onClick}>
      <p className="name">{tagName}</p>
      {editable && (
        <div className="tag-delete-button">
          <div className="icon"><CloseIcon /></div>
        </div>
      )}
    </button>
  );
};

const TagList = ({ tags=[], small=false, onClick=(() => {}), editable=false, setTags }) => {
  if (editable)
    onClick = idx => popTag(tags, setTags, idx);

  return (
    <ul className={`tag-list ${editable ? "editable" : ""} ${small ? "small" : ""}`}>
      {tags.map((tag, idx) => <TagItem key={idx} tag={tag} editable={editable} onClick={() => onClick(idx)} />)}
    </ul>
  );
};

export default TagList;
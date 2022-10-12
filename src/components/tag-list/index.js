import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";

import "./style.scoped.scss";
import CloseIcon from "../../asset/icons/mui/close-icon";



export class TagController {
  tags;
  setTags;

  constructor(dataList) {
    [this.tags, this.setTags] = useState(dataList);
  }

  push(data) {
    let newTags = this.tags.slice();
    newTags.push(data);
    this.setTags(newTags);
  }
  pop(idx) {
    let newTags = this.tags.slice();
    newTags.splice(idx, 1);
    this.setTags(newTags);
  }
}


const TagItem = ({ idx, data, controller }) => {
  // ### { id:(태그 ID), name:(태그명), type:(음식/지역) } :
  // ###   { name:"대구", type="region" },
  // ###   "김치찌개" -> 이런 것도 일단은 임시로 가능. 자동으로 음식 태그로 변환
  const _data = (typeof data === "object") ? data : { name: data, type: "food" };
  console.log(_data);

  const { name, type } = _data;

  return (
    <li className="tag-item" data-tag-type={type} onClick={() => (controller && controller.pop(idx))}>
      <p className="name">{name}</p>
      { controller && (
        <button className="tag-delete-button">
          <div className="icon"><CloseIcon /></div>
        </button>
      )}
    </li>
  );
};

const TagList = ({ controller, dataList=[], small=false }) => {
  if (controller) {   // editable
    return (
      <ul className={`tag-list editable ${small ? "small" : ""}`}>
        {controller.tags.map((data, idx) => <TagItem key={idx} idx={idx} data={data} controller={controller} />)}
      </ul>
    );
  } else {
    return (
      <ul className={`tag-list ${small ? "small" : ""}`}>
        {dataList.map((data, idx) => <TagItem key={idx} idx={idx} data={data} controller={controller} />)}
      </ul>
    );
  }
};

export default TagList;
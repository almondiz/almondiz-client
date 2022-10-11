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
  // [(태그명), (지역 태그인지 아닌지 불리언)] : ["대구", true], ["김치찌개", false]
  const [name, isRegion] = Array.isArray(data) ? data : [data, false];

  return (
    <li className="tag-item" data-region={isRegion} onClick={() => (controller && controller.pop(idx))}>
      <p className="name">{name}</p>
      { controller && (
        <button className="tag-delete-button">
          <div className="icon"><CloseIcon /></div>
        </button>
      )}
    </li>
  );
};

const TagList = ({ controller, dataList, small=false }) => {
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
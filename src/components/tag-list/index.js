import React from "react";

import "./style.scoped.scss";


const TagItem = ({ data }) => {
  return (
    <li className="tag-item">{data}</li>
  );
};

const TagList = ({ dataList }) => {
  return (
    <ul className="tag-list">
      {dataList.map((data, idx) => <TagItem key={idx} data={data} />)}
    </ul>
  );
};

export default TagList;
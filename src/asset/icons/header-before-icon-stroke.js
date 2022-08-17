import React from "react";

const HeaderBeforeIcon = ({ className = "", color = "#ffffff" }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.8852 3.77L16.1152 2L6.11523 12L16.1152 22L17.8852 20.23L9.65523 12L17.8852 3.77Z" fill={color}/>
    </svg>
  )
}

export default HeaderBeforeIcon;
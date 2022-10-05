import React from "react";

const ExpandMoreIcon = ({ height="1.5rem", fill="var(--primary-text-color)" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} width={height} fill={fill} viewBox="0 0 48 48"><path d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"/></svg>
    );
};

export default ExpandMoreIcon;
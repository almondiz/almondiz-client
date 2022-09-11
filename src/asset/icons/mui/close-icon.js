import React from "react";

const CloseIcon = ({ height="1.5rem", fill="var(--primary-text-color)" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} width={height} fill={fill} viewBox="0 0 48 48"><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg>
    );
};

export default CloseIcon;
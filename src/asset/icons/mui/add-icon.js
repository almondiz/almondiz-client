import React from "react";

const AddIcon = ({ height="1.5rem", fill="var(--primary-text-color)" }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} width={height} fill={fill} viewBox="0 0 48 48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>
    );
};

export default AddIcon;
import React from "react";
import Img from "../atoms/Img";
import Strong from "../atoms/Strong";
import DescParagraph from "../atoms/DescParagraph";

const PostItem = ({ data }) => {
  const { src, title, desc, prev, width, height } = data ? data : {};
  return (
    <li className="postItem">
      <div className="wrap_thumb">
        <Img src={src} prev={prev} width={width} height={height} />
      </div>
      <div className="wrap_info">
        <Strong title={title} />
        <DescParagraph desc={desc} />
      </div>
    </li>
  );
};

export default PostItem;

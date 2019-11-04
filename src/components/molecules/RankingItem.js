import React from "react";
import Img from "../atoms/Img";
import Strong from "../atoms/Strong";
import DescParagraph from "../atoms/DescParagraph";
const RankingItem = ({ data, rank }) => {
  const {
    largeImageURL,
    title,
    desc,
    previewURL,
    webformatWidth,
    webformatHeight
  } = data ? data : {};
  const src = largeImageURL;
  const prev = previewURL;
  const width = webformatWidth;
  const height = webformatHeight;
  return (
    <li className="RankItem">
      <em>{rank}</em>
      <div className="wrap_thumb">
        <Img src={src} prev={prev} width={30} height={30} />
      </div>
      <div className="wrap_info">
        <Strong title={title} />
        <DescParagraph desc={desc} />
      </div>
    </li>
  );
};

export default RankingItem;

import React from "react";
import Img from "../atoms/Img";
import "./Ranking.scss";
import { getPixaApi } from "../util/api";

const RankingItem = ({ data, rank }) => {
  const {
    largeImageURL,
    title,
    desc,
    previewURL,
    webformatWidth,
    webformatHeight
  } = data ? data : {};
  console.log(data);
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
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
    </li>
  );
};

const Ranking = () => {
  const [list, setListData] = React.useState([]);
  React.useEffect(() => {
    getPixaApi(5).then(data => {
      return setListData(data);
    });
  }, []);
  return (
    <div className="Ranking">
      <h2>Rank List</h2>
      <ol>
        {list &&
          list.map((item, index) => {
            let rank = index + 1;
            return <RankingItem key={index} data={item} rank={rank} />;
          })}
      </ol>
    </div>
  );
};

export default Ranking;

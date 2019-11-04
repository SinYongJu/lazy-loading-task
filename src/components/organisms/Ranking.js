import React from "react";
import { getPixaApi } from "../util/api";
import RankingItem from "../molecules/RankingItem";
import "./Ranking.scss";

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

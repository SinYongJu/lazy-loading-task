import React from "react";
import "./Feature.scss";
import { getContentApi } from "../util/api";
import FeatureItem from "../molecules/FeatureItem";

const FEATURE = "feature";

const Feature = () => {
  const [list, setListData] = React.useState(null);

  React.useEffect(() => {
    getContentApi(FEATURE).then(data => {
      return setListData(data);
    });
  }, []);
  const drawList = () => {
    return list ? (
      list.map((item, index) => {
        return <FeatureItem key={index} data={item} />;
      })
    ) : (
      <div>...loading</div>
    );
  };
  return (
    <div className="feature">
      <h2>Main Banner post</h2>
      <div className="main_banner">
        <ul>{drawList()}</ul>
      </div>
    </div>
  );
};

export default Feature;

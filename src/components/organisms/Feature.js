import React from "react";
import "./Feature.scss";
import { getContentApi } from "../util/api";
import Img from "../atoms/Img";

const FEATURE = "feature";

const ListItem = ({ data }) => {
  const { src, title, desc, prev, width, height } = data ? data : {};
  return (
    <li className="bannerItem">
      <div className="wrap_thumb">
        <Img src={src} prev={prev} width={width} height={height} />
      </div>
      <div className="wrap_info">
        <strong>{title}</strong>
        <p>{desc}</p>
      </div>
    </li>
  );
};

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
        return <ListItem key={index} data={item}></ListItem>;
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

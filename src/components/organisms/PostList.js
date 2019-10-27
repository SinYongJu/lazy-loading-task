import React from "react";
import "./PostList.scss";
import Img from "../atoms/Img";
import { getContentApi } from "../util/api";

const POST = "post";
const PostItem = ({ data }) => {
  const { src, title, desc, prev, width, height } = data ? data : {};
  return (
    <li className="postItem">
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
const PostList = () => {
  const [list, setListData] = React.useState(null);

  React.useEffect(() => {
    getContentApi(POST).then(data => {
      setTimeout(setListData(data), 2000);
    });
  }, []);

  const drawList = () => {
    return list ? (
      list.map((item, index) => {
        return <PostItem key={index} data={item} />;
      })
    ) : (
      <div>...loading</div>
    );
  };
  return (
    <div className="postList">
      <ul>{drawList()}</ul>
    </div>
  );
};

export default PostList;

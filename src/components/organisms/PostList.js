import React from "react";
import "./PostList.scss";
import { getContentApi } from "../util/api";
import PostItem from "../molecules/PostItem";

const POST = "post";

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

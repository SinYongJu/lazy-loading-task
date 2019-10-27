import React from "react";
import "./Banner.scss";
import Img from "../atoms/Img";
import { getPixaApi } from "../util/api";

const Banner = () => {
  const [banner, setBanner] = React.useState(null);
  React.useEffect(() => {
    const getBannerImg = async () => {
      const img = await getPixaApi(3);
      const src = img[0].largeImageURL;
      const prev = img[0].previewURL;
      const width = img[0].webformatWidth;
      const height = img[0].webformatHeight;
      setBanner(c => ({
        ...c,
        src,
        prev,
        width,
        height
      }));
      // return <Img src={src} prev={prev} width={width} height={height} />;
    };
    getBannerImg();
  }, []);
  return (
    <div className="Banner">
      <a href="#none">{banner && <Img {...banner} />}</a>
    </div>
  );
};

export default Banner;

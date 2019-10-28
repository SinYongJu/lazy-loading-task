import React, { useContext, useRef } from "react";
import { LazyLoadImageContext } from "../util/lazyLoadImages";
const IS_NORMAL = false;
const IS_MEDIUM = false;

const GetImageElements = props => {
  const imgRef = useRef(null);
  const { lazyLoad } = useContext(LazyLoadImageContext);
  React.useEffect(() => {
    if (!IS_NORMAL) {
      lazyLoad(imgRef.current);
    }
  }, [lazyLoad]);

  const { src, alt, prev, onError, onLoad } = props;
  return (
    <div className="thumb_container">
      {IS_NORMAL ? (
        <img
          onError={onError}
          onLoad={onLoad}
          alt={alt ? alt : ""}
          src={src ? src : ""}
        />
      ) : IS_MEDIUM ? (
        <img
          ref={imgRef}
          className={"lazy"}
          onError={onError}
          onLoad={onLoad}
          src={prev}
          alt={alt ? alt : ""}
          data-src={src ? src : ""}
        />
      ) : (
        <img
          ref={imgRef}
          className={"lazy"}
          onError={onError}
          onLoad={onLoad}
          alt={alt ? alt : ""}
          data-src={src ? src : ""}
        />
      )}
    </div>
  );
};

const Img = props => {
  const lazyErrorHander = e => {
    // console.log(e.currentTarget, "error");
  };
  const lazyLoadHandler = e => {
    // console.log("loaded", e.currentTarget);
  };
  const Image = GetImageElements;
  return (
    <>
      <Image
        onLoad={lazyLoadHandler}
        onError={lazyErrorHander}
        {...props}
      ></Image>
    </>
  );
};

export default Img;

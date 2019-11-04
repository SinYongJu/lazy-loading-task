import React, { useContext, useRef } from "react";
import { LazyLoadImageContext } from "../util/lazyLoadImages";
const IS_NORMAL = false;
const IS_MEDIUM = false;

const Img = props => {
  const imgRef = useRef(null);
  const imgContainer = useRef(null);
  const { lazyLoad } = useContext(LazyLoadImageContext);
  React.useEffect(() => {
    if (!IS_NORMAL) {
      lazyLoad(imgRef.current);
    }
    // console.dir(imgContainer.current.offsetTop);
  }, [lazyLoad]);

  const { src, alt, prev } = props;

  const onError = e => {
    // console.log(e.currentTarget, "error");
  };

  const onLoad = e => {
    // console.log("loaded", e.currentTarget);
  };
  return (
    <div ref={imgContainer} className="thumb_container">
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

export default Img;

import React, { createContext, useState, useEffect } from "react";
import { ScrollContext } from "./ScrollContext";
const LazyLoadImageContext = createContext(null);
const LAZY_CLASS = "lazy";
const LazyLoadImageProvider = props => {
  const ScrollCtx = React.useContext(ScrollContext);
  const { getScrollTop } = ScrollCtx;
  const [observer, setObserver] = useState(null);
  useEffect(() => {
    if (
      !observer &&
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype
    ) {
      setObserver(new IntersectionObserver(observerHandler));
    }
  }, [observer]);

  const lazyLoad = img => {
    if (observer !== null) {
      observer.observe(img);
    } else {
      removeLazyClass(
        isCurrentViewPortImageSrc(
          img.offsetParent.offsetTop,
          img.offsetParent.clientHeight,
          getScrollTop().top,
          getScrollTop().innerHeight
        ),
        img
      );
    }
  };
  const value = {
    lazyLoad
  };
  return (
    <LazyLoadImageContext.Provider value={value}>
      {props.children}
    </LazyLoadImageContext.Provider>
  );
};

const LazyLoadConsumer = LazyLoadImageContext.Consumer;

export { LazyLoadImageContext, LazyLoadImageProvider, LazyLoadConsumer };

function observerHandler(entries, observer) {
  entries.map(entry => {
    let target = entry.target;
    if (entry.isIntersecting) {
      target.classList.remove(LAZY_CLASS);
      target.src = target.dataset.src;
    }
  });
}
/**
 * 1. 멀린 hoc 또는 context에서의 참조
 * 2. 션 hoc or context에서의 이벤트 버스
 *
 */

function isCurrentViewPortImageSrc(
  offsetTop,
  clientHeight,
  scrollTop,
  windowInnerHeight
) {
  return (
    offsetTop + clientHeight < scrollTop ||
    offsetTop - windowInnerHeight > scrollTop
  );
}

function removeLazyClass(isNotLazy, el) {
  if (isNotLazy) {
    el.src = "";
    el.classList.add(LAZY_CLASS);
  } else {
    el.src = el.dataset.src;
    // Array.from(el.classList).find();
    el.classList.remove(LAZY_CLASS);
  }
}

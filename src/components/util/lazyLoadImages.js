import React, { createContext, useState, useEffect } from "react";

const LazyLoadImageContext = createContext(null);
const LazyLoadImageProvider = props => {
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
  const [scrollTop, setScrollTop] = useState({ top: 0 });
  React.useMemo(() => {
    const updateScrollTop = e => {
      setScrollTop(c => ({
        ...c,
        top: window.pageYOffset,
        innerHeight: window.innerHeight
      }));
    };
    if (observer === null)
      window.addEventListener("scroll", throttle(updateScrollTop));
    return () => window.removeEventListener("scroll", updateScrollTop);
  }, [observer]);

  const lazyLoad = img => {
    if (observer !== null) {
      observer.observe(img);
    } else {
      removeLazyClass(
        isCurrentViewPortImageSrc(
          img.offsetParent.offsetTop,
          img.offsetParent.clientHeight,
          scrollTop.top,
          scrollTop.innerHeight
        ),
        img
      );
    }
  };

  const getScrollTop = () => scrollTop.top;

  const value = {
    lazyLoad,
    getScrollTop
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
      target.classList.remove("lazy");
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
    el.classList.add("lazy");
  } else {
    el.src = el.dataset.src;
    // Array.from(el.classList).find();
    el.classList.remove("lazy");
  }
}
/**
 *
 * throttling methods
 * @param { Function } func
 *
 */
function throttle(func) {
  let throttleTimeout = null;
  console.log("클로져냐?");
  return () => {
    if (throttleTimeout !== null) {
      clearTimeout(throttleTimeout);
    }
    throttleTimeout = setTimeout(func, 10);
  };
}

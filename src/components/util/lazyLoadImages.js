import React, { useContext, createContext, useState, useEffect } from "react";

function observerHandler(entries, observer) {
  entries.map(entry => {
    let target = entry.target;
    if (entry.isIntersecting) {
      target.classList.remove("lazy");
      target.src = target.dataset.src;
    }
  });
}

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
  const lazyLoad = img => {
    observer.observe(img);
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

/**
 * 1. 멀린 hoc 또는 context에서의 참조
 * 2. 션 hoc or context에서의 이벤트 버스
 *
 */

function isCurrentViewPortImageSrc(
  offsetTop,
  clientHeight,
  windowInnerHeight,
  scrollTop
) {
  return (
    offsetTop + clientHeight < scrollTop ||
    offsetTop - windowInnerHeight > scrollTop
  );
}

function addLazyClass(isLazy, el) {
  if (!isLazy) {
    //   el.src = ''
    //   el.classList.add('lazy')
    // } else {
    el.src = el.dataset.src;
    // Array.from(el.classList).find();
    el.classList.remove("lazy");
  }
}

function lazyScrollHeight(el) {
  const lazyloader = el => {
    let scrollTop = window.pageYOffset;
    console.log("closure scroll 실행", el);
    //here
    let { offsetTop, clientHeight } = el;
    addLazyClass(
      isCurrentViewPortImageSrc(
        offsetTop,
        clientHeight,
        window.innerHeight,
        scrollTop
      ),
      el
    );
    // }); // end
    if (!el) {
      document.removeEventListener("scroll", lazyThrottle);
      window.removeEventListener("resize", lazyThrottle);
      window.removeEventListener("orientationChange", lazyThrottle);
    }
  };

  const lazyThrottle = throttle(lazyloader).bind(el);
  lazyThrottle(); // 시작시 화면에 따른 로딩을 위함
  document.addEventListener("scroll", lazyThrottle);
  window.addEventListener("resize", lazyThrottle);
  window.addEventListener("orientationChange", lazyThrottle);
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
  return el => {
    if (throttleTimeout) {
      clearTimeout(throttleTimeout);
    }
    throttleTimeout = setTimeout(func, 10);
  };
}

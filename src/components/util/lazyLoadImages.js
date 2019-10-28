import React from "react";

function observerHandler(entries, obserber) {
  entries.map(entry => {
    let target = entry.target;
    if (entry.isIntersecting) {
      target.classList.remove("lazy");
      target.src = target.dataset.src;
    }
  });
}
const observer = new IntersectionObserver(observerHandler);
const LazyLoadImages = Component => {
  return class extends React.Component {
    lazyLoadObserver = img => {
      if (img) {
        observer.observe(img);
      }
    };
    render() {
      return (
        <Component
          lazyAction={this.lazyLoadObserver}
          {...this.props}
        ></Component>
      );
    }
  };
};
export default LazyLoadImages;

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

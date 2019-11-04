import React, { createContext, useState } from "react";

const THROTTLE_DURATION = 10;
const ScrollContext = createContext(null);
const ScrollProvider = props => {
  const [scrollTop, setScrollTop] = useState({ top: 0 });
  React.useMemo(() => {
    const updateScrollTop = e => {
      setScrollTop(c => ({
        ...c,
        top: window.pageYOffset,
        innerHeight: window.innerHeight
      }));
    };
    window.addEventListener("scroll", throttle(updateScrollTop));
    return () => window.removeEventListener("scroll", updateScrollTop);
  }, []);

  const getScrollTop = () => scrollTop;

  const value = {
    getScrollTop
  };
  return (
    <ScrollContext.Provider value={value}>
      {props.children}
    </ScrollContext.Provider>
  );
};

const ScrollConsumer = ScrollContext.Consumer;

export { ScrollContext, ScrollProvider, ScrollConsumer };

/**
 * 1. 멀린 hoc 또는 context에서의 참조
 * 2. 션 hoc or context에서의 이벤트 버스
 *
 */
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
    throttleTimeout = setTimeout(func, THROTTLE_DURATION);
  };
}

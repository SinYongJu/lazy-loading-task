import React from "react";
import "./SubNav.scss";
import { ScrollContext } from "../context/ScrollContext";
const SubNav = () => {
  const { getScrollTop } = React.useContext(ScrollContext);
  let subRef = React.useRef(null);
  const [sticky, actionSticky] = React.useState(false);
  React.useEffect(() => {
    const offset = subRef.current.offsetTop + subRef.current.clientHeight;
    if (getScrollTop().top > offset) {
      actionSticky(c => true);
    } else {
      actionSticky(c => false);
    }
  }, [getScrollTop]);
  return (
    <div className={sticky ? "SubNav sticky" : "SubNav"} ref={subRef}>
      <strong>Sub Navi</strong>
      <ul>
        <li>Top</li>
        <li>amount</li>
        <li>etcs</li>
        <li>hoho</li>
      </ul>
    </div>
  );
};

export default SubNav;

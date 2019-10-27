import React from "react";
import LandingTemplate from "../template/LandingTemplate";
import Feature from "../organisms/Feature";
import Ranking from "../organisms/Ranking";
import PostList from "../organisms/PostList";
import Banner from "../organisms/Banner";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

// lazyLoadObserver();
const App = props => {
  console.log(props);
  const landingComponents = {
    feature: <Feature />,
    banner: <Banner />,
    sideRight: <Ranking />,
    postlist: <PostList />
  };

  return (
    <>
      <Header />
      <LandingTemplate components={landingComponents} />
      <Footer />
    </>
  );
};

export default App;

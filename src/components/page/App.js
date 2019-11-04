import React from "react";
import LandingTemplate from "../template/LandingTemplate";
import Feature from "../organisms/Feature";
import Ranking from "../organisms/Ranking";
import PostList from "../organisms/PostList";
import Banner from "../organisms/Banner";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { LazyLoadImageProvider } from "../context/lazyLoadImages";
import { ScrollProvider } from "../context/ScrollContext";
import SubNav from "../organisms/SubNav";
// lazyLoadObserver();
const App = props => {
  const landingComponents = {
    feature: <Feature />,
    banner: <Banner />,
    sideRight: <Ranking />,
    postlist: <PostList />,
    subNav: <SubNav />
  };

  return (
    <ScrollProvider>
      <LazyLoadImageProvider>
        <Header />
        <LandingTemplate components={landingComponents} />
        <Footer />
      </LazyLoadImageProvider>
    </ScrollProvider>
  );
};

export default App;

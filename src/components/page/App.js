import React from "react";
import LandingTemplate from "../template/LandingTemplate";
import Feature from "../organisms/Feature";
import Ranking from "../organisms/Ranking";
import PostList from "../organisms/PostList";
import Banner from "../organisms/Banner";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import { LazyLoadImageProvider } from "../util/lazyLoadImages";
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
    <LazyLoadImageProvider>
      <Header />
      <LandingTemplate components={landingComponents} />
      <Footer />
    </LazyLoadImageProvider>
  );
};

export default App;

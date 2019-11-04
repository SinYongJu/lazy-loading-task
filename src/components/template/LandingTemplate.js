import React from "react";
import "./LandingTemplate.scss";
const LandingTemplate = props => {
  const { feature, sideRight, subNav, postlist, banner } = props.components;
  return (
    <main>
      {subNav}
      {feature}
      {banner}
      {postlist}
      {sideRight}
    </main>
  );
};

export default LandingTemplate;

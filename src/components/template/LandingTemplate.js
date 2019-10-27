import React from "react";
import "./LandingTemplate.scss";
const LandingTemplate = props => {
  const { feature, sideRight, postlist, banner } = props.components;
  return (
    <main>
      {feature}
      {banner}

      {postlist}
      {sideRight}
    </main>
  );
};

export default LandingTemplate;

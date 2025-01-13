import React from "react";
import hero_image from "../assets/hero-image.jpg";

const HeroImage = () => {
  return (
    <img
      className="w-full h-[300px] object-cover"
      src={hero_image}
      alt="hero-banner"
    />
  );
};

export default HeroImage;

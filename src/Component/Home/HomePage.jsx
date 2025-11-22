import React from "react";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iphone 14 Pro"
        subtitle="Experience the power of all new iphone 14 pro with our most pro camera ever"
        link="/product/69148fdc5757f83a16749afe"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-matched Magic Accessories to your bag after configure the Mac Mini."
        link="/product/69148fdc5757f83a16749b06"
        image={mac}
      />
    </div>
  );
};

export default HomePage;

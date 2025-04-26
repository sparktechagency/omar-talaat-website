import React from "react";
// import Banner from './Banner'
import FAQSection from "./FaqSection";
import ReviewsSection from "./ReviewsSection";
import Products from "./Products";
import OurShop from "./OurShop";
import Banner from "./Banner";
import BannerSection from "./BannerSection";

const HomePageContainer = () => {
  return (
    <div>
      {/* <Banner /> */}
      {/* <BannerSection /> */}
      <Products />
      <OurShop />
      <ReviewsSection />
      {/* <FAQSection /> */}
    </div>
  );
};

export default HomePageContainer;

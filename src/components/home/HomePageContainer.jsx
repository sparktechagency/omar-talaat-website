import React from "react";
import CountdownProgressTracker from "./TimeSection";
import ShopCategory from "./ShopCategory";
import RecentAdded from "./RecentAded";
import RecentView from "./RecentView";
import Ficilities from "./Ficilities";
import GallaryImage from "./GallaryImage";

const HomePageContainer = () => {
  return (
    <div>
      <CountdownProgressTracker />
      <ShopCategory />
      <RecentAdded />
      <RecentView />
      <Ficilities />
      <GallaryImage />
      {/* <Banner /> */}
      {/* <TodaysVideo />
      <ComingSoon />
      <DailyInspiration />
      <NewClasses />
      <BrowseByCategory /> */}
    </div>
  );
};

export default HomePageContainer;

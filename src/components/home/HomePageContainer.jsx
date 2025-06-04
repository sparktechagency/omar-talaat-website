import React from "react";
import CountdownProgressTracker from "./TimeSection";
import ShopCategory from "./ShopCategory";
import RecentAdded from "./RecentAded";
import RecentView from "./RecentView";

const HomePageContainer = () => {
  return (
    <div>
      <CountdownProgressTracker />
      <ShopCategory />
      <RecentAdded />
      <RecentView />
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

import React from "react";
import { TodaysVideo } from "./TodaysVideo";
import { ComingSoon } from "./ComingSoon";
import { DailyInspiration } from "./DailyInspiration";
import NewClasses from "../exploreComponents/NewClasses";
import BrowseByCategory from "../exploreComponents/BrowseByCategory";

const HomePageContainer = () => {
  return (
    <div>
      <TodaysVideo />
      <ComingSoon />
      <DailyInspiration />
      <NewClasses />
      <BrowseByCategory />
    </div>
  );
};

export default HomePageContainer;

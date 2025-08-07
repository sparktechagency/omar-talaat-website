"use client";

import dynamic from "next/dynamic";
import Spinner from "../Spinner";

const LoadingSpinner = () => <Spinner />;

const ShopContainer = dynamic(() => import("@/components/shop/ShopContainer"), {
  ssr: false,
  loading: LoadingSpinner, 
});

const Page = () => {
  return (
    <div>
      <ShopContainer />
    </div>
  );
};

export default Page;

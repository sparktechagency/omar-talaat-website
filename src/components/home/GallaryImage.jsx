import Image from "next/image";
import React from "react";

const GallaryImage = () => {
  return (
    <div className="mt-20 mb-10 px-4">
      <h2 className="font-bold text-xl text-center w-full mb-[30px]">
        Gallery
      </h2>
      <div className="relative w-full ">
        <Image
          src="/assets/gallary.png"
          alt="Gallery"
          height={500}
          width={1600}
        //   layout="responsive"
          className="w-full h-[400px] md:h-[500px] lg:h-[700px] object-cover"
        />
      </div>
    </div>
  );
};

export default GallaryImage;

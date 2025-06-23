import Image from "next/image";
import React from "react";
import Container from "../share/Container";

const GallaryImage = () => {
  return (
    <Container className="mt-20 mb-10  container mx-auto">
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
    </Container>
  );
};

export default GallaryImage;

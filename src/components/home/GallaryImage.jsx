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
          width={1100}
          //   layout="responsive"
          className="w-full h-[400px] md:h-[500px] lg:h-[700px] object-cover"
        />
      </div>

     <div className="mt-[45px]">
      <span className="text-xl font-bold">Description : </span>
     <p>
        Corals are marine animals, related to jellyfish and sea anemones, that
        live in colonies of individual polyps. These polyps secrete a hard,
        calcium carbonate skeleton, which, in some species, builds up over time
        to form coral reefs. Reef-building corals are crucial for marine
        ecosystems, providing habitats for a vast array of other species.
      </p>
     </div>
    </Container>
  );
};

export default GallaryImage;

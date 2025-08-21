"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Container from "../share/Container";
import { useGetGalleryQuery } from "@/redux/featured/homePage/gallayApi";
import { useSearchParams } from "next/navigation";
import { getImageUrl } from "../share/imageUrl";

const GallaryImage = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Get search term from URL params
  useEffect(() => {
    const urlSearchTerm = searchParams.get("searchTerm") || "";
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  const {data:gallery} = useGetGalleryQuery(searchTerm);
  const galleryData = gallery?.data;

  return (
    <Container className="mt-20 mb-10 container mx-auto">
      <h2 className="font-bold text-xl text-center w-full mb-[30px]">
        Gallery
      </h2>
      
      {galleryData && galleryData.length > 0 ? (
        <>
          <div className="relative w-full">
            <Image
              src={getImageUrl(galleryData[0].image)}

              alt="Gallery"
              height={500}
              width={1100}
              className="w-full h-[400px] md:h-[500px] lg:h-[700px] object-cover"
            />
          </div>
          
          <div className="mt-[45px]">
            <span className="text-xl font-bold">Description : </span>
            <p>{galleryData[0].description}</p>
          </div>
          
          {galleryData.length > 1 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {galleryData.slice(1).map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt="Gallery Item"
                    height={300}
                    width={500}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p>No gallery items found.</p>
        </div>
      )}
    </Container>
  );
};

export default GallaryImage;

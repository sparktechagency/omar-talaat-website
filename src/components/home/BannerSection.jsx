// import { ImageCarousel } from "@/components/image-carousel";

import { ImageCarousel } from "./ImageCarousel";

export default function BannerSection() {
  // Sample image data
  const images = [
    {
      src: "/assests/image1.png",
      alt: "Slide 1",
    },
    {
      src: "/assests/banner.png",
      alt: "Slide 2",
    },
    
  ];

  return (
    <div className="container mx-auto space-y-12 py-8">
   

      <section>

        <ImageCarousel
          images={[
            {
              src: "/assests/banner.png",
              alt: "Slide 1",
              title: "Welcome to Our Collection",
              description:
                "Discover amazing products and services tailored just for you",
            },
            {
              src: "/assests/banner1.png",
              alt: "Slide 2",
              title: "Special Offers",
              description: "Limited time deals you won't want to miss",
            },
          ]}
          showControls={false}
          showIndicators={true}
          textStyle="gradient"
        />
      </section>
    </div>
  );
}

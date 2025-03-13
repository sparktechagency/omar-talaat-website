import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
// import Ellipse from "../../../public/assests/Ellipse.jpg"

const reviews = [
  {
    name: "James William",
    review:
      "The staff here treats everyone like family, going above and beyond to ensure comfort and happiness. My mom feels safe, cared for, and truly at home.",
    rating: 5,
    image: `/assests/Ellipse.jpg`,
  },
  {
    name: "kamal",
    review:
      "The staff here treats everyone like family, going above and beyond to ensure comfort and happiness. My mom feels safe, cared for, and truly at home.",
    rating: 4,
    image: `/assests/profile.png`,
  },
  {
    name: "Jamal William",
    review:
      "The staff here treats everyone like family, going above and beyond to ensure comfort and happiness. My mom feels safe, cared for, and truly at home.",
    rating: 5,
    image: `/assests/Ellipse.jpg`,
  },
  {
    name: "Alam William",
    review:
      "The staff here treats everyone like family, going above and beyond to ensure comfort and happiness. My mom feels safe, cared for, and truly at home.",
    rating: 5,
    image: `/assests/Ellipse.jpg`,
  },
  // Add more review objects here
];

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-12 mx-6 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40 text-white ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Are People Saying About Peace Haven
        </h2>

        <Carousel className="w-full bg-[#121314]  rounded-tl-[50px] rounded-br-[50px] mx-auto">
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                <div className=" rounded-xl shadow-lg p-4 md:p-8 lg:p-12 xl:p16 2xl:p-20 mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-10 ">
                    <Image
                      src={review.image}
                      alt={review.name}
                      height={200}
                      width={200}
                      className=" rounded-tl-3xl rounded-br-3xl object-cover"
                    />
                    <div className="space-y-3 max-w-xl">
                      <p className="text-[#A3A3A3F5] leading-relaxed">
                        {review.review}
                      </p>
                      <h3 className="font-bold text-lg">{review.name}</h3>
                      <div className="flex gap-1 text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex gap-4 justify-center mt-8 text-white">
            <CarouselPrevious className="bg-transparent text-white" />
            <CarouselNext className="bg-transparent text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import image15 from "../.../../../../public/assests/banner-bg.jpg";
import banner from "../.../../../../public/assests/banner.jpg";

export default function Banner() {
  return (
    <section className="relative w-full h-[500px] bg-[#18191b] my-12">
      {/* Background Image */}
      <div className="relative w-full h-full overflow-hidden rounded-b-[50px]">
        <Image
          src={image15}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div>
          <h1 className=" mb-2">
            High Quality, High Standards, Your Choice
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
            Premium cannabis, trusted <br /> quality, your way.
          </p>
          {/* Optional Button */}
          <Button className="mt-4">Learn More</Button>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import * as React from "react";
// import Autoplay from "embla-carousel-autoplay";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export default function Banner() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 2000, stopOnInteraction: true })
//   );

//   return (
//     <Carousel
//       plugins={[plugin.current]}
//       className="w-full max-w-xs"
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent>
//         {Array.from({ length: 2 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card
//                 style={{
//                   backgroundImage: `url(/assests/${
//                     index % 2 === 0 ? "banner-bg.jpg" : "banner.jpg"
//                   })`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   width: "100%",
//                   height: "300px", // adjust height as per your design
//                 }}
//               >
//                 <CardContent className="flex aspect-square items-center justify-center p-6 bg-opacity-40 bg-black">
//                   <span className="text-4xl font-semibold text-white">
//                     Banner {index + 1}
//                   </span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }

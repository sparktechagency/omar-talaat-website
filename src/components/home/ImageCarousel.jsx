"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ImageCarousel({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  aspectRatio = "video",
  height = 600,
  showControls = true,
  showIndicators = true,
  textStyle = "dark",
  className,
  ...props
}) {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  // Handle autoplay
  React.useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      api?.next();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [api, autoPlay, autoPlayInterval]);

  // Update current index when slide changes
  React.useEffect(() => {
    if (!api) return;

    const onChange = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onChange);
    return () => {
      api.off("select", onChange);
    };
  }, [api]);

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    custom: "",
  };

  return (
    <div className={cn("relative w-full min-w-[320px]", className)} {...props}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg",
                  aspectRatio !== "custom" && aspectRatioClasses[aspectRatio]
                )}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={1440}
                  height={height}
                  className="h-full w-full object-cover"
                />
                {(image.title || image.description) && textStyle !== "none" && (
                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                    )}
                  >
                    {image.title && (
                      <h3 className="mb-2 text-xl text-white font-bold md:text-2xl lg:text-3xl">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="max-w-md text-white text-sm md:text-base">
                        {image.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {showControls && (
          <>
            <CarouselPrevious className="left-4 md:left-8" />
            <CarouselNext className="right-4 md:right-8" />
          </>
        )}
      </Carousel>

      {showIndicators && images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className={cn(
                "h-3 w-3 rounded-full p-0",
                current === index ? "bg-primary" : "bg-muted"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

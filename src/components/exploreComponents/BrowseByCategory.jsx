import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrowseByCategory({ onSeeMore, onClassClick }) {
  // Sample data for category browsing
  const categorizedClasses = [
    {
      id: 1,
      title: "Cooling Yoga Flow",
      image: "/assests/Rectangle (15).png",
    },
    { id: 2, title: "Cooling Yoga Flow", image: "/assests/Rectangle (7).png" },
    { id: 3, title: "Cooling Yoga Flow", image: "/assests/Rectangle (9).png" },
    { id: 4, title: "Cooling Yoga Flow", image: "/assests/Rectangle (11).png" },
    { id: 5, title: "Cooling Yoga Flow", image: "/assests/Rectangle (12).png" },
    { id: 6, title: "Cooling Yoga Flow", image: "/assests/Rectangle (13).png" },
  ];

  return (
    <section className="mb-10 mx-3">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Browse By Categories</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-10">
        {categorizedClasses.map((yogaClass) => (
          <div
            key={yogaClass.id}
            className="relative h-80 rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => onClassClick(yogaClass.id)}
          >
            <Link href={`/favorite/${yogaClass.id}`}>
              <div className="relative w-full h-full">
                {/* Image displayed on top */}
                <Image
                  src={yogaClass.image}
                  alt={yogaClass.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 w-full h-full"
                />
                {/* Gradient Overlay on top of the image */}
                <div
                  className="absolute inset-0 bg-gradient-to-t"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, #FFFFFF00, #FFFFFF00, #A92C2C)",
                  }}
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="text-white font-medium text-lg">
                    {yogaClass.title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          variant="link"
          className="text-rose-500 hover:text-rose-600"
          onClick={onSeeMore}
        >
          See More
        </Button>
      </div>
    </section>
  );
}

// pages/index.js
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Wholesale() {
  return (
    <div className=" text-white min-h-screen">
      {/* Hero sections / Featured products */}
      <div className="">
        <div className="relative flex flex-col md:flex-row  rounded-lg overflow-hidden mb-12">
          <div className="w-1/2">
            <div className="absolute top-0 bottom-0 left-0 w-12 bg-red-700 flex flex-col items-center justify-center">
              <div className="transform -rotate-90 whitespace-nowrap text-center font-bold text-sm">
                FAMES CONSECTET
              </div>
            </div>

            {/* Middle content */}
            <div className="ml-12 md:pl-6 pr-4 py-6  mt-12 ">
              <h2 className="text-2xl font-bold mb-6">Morbi Egestasinnon</h2>
              <p className="text-description text-sm mb-6 max-w-xl">
                Amet et Ultrices in Viverra Volutpat. Lorem Tellus Euismod Enim
                Amet Nullam Interdum Quamlibel Morbi Placerat Vivamus Sed Morbi
                Pretium. Sit Aenean Pellentesque Nam Et. Cum Id Ut Morbi Porta
                Massa In Sollicitudin? Vitae, Congue Lobortis Dui Eget Risus
                Nibh Amet Sapien Oreper. Eget Amet Orci Interdum. Eget Orci
                Vitae Amet Amet Eget Amet Vitae, Pellentesque Nam Et.
              </p>
              <Link href="/wholesale-register">
                
                <Button className="bg-button px-4 py-2">Register Now</Button>
              </Link>
            </div>
          </div>

          {/* Image on the right */}
          <div className="hidden md:block md:w-1/2 mx-auto">
            <img
              src="/assests/wholesales.png"
              alt="Happy student with clipboard"
              className="h-[90%] w-3/4 mx-auto rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Middle Product - Vape Pod */}
        <div className="relative flex flex-col md:flex-row  rounded-lg overflow-hidden mb-12">
          <div className="hidden md:block md:w-1/2 mx-auto">
            <div>
              <img
                src="/assests/wholesales2.png"
                alt="Happy student with clipboard"
                className="h-[90%] w-3/4 mx-auto rounded-2xl object-cover"
              />
            </div>
          </div>

          <div className="w-1/2">
            <div className="absolute top-0 bottom-0 right-0 w-12 bg-red-700 flex flex-col items-center justify-center">
              <div className="transform rotate-90 whitespace-nowrap text-center font-bold text-sm">
                MOLESTIE
              </div>
            </div>

            {/* Middle content */}
            <div className="ml-12 md:pl-6 pr-4 py-6  mt-12 ">
              <h2 className="text-2xl font-bold mb-6">Morbi Egestasinnon</h2>
              <p className="text-description text-sm mb-6 max-w-xl">
                Amet et Ultrices in Viverra Volutpat. Lorem Tellus Euismod Enim
                Amet Nullam Interdum Quamlibel Morbi Placerat Vivamus Sed Morbi
                Pretium. Sit Aenean Pellentesque Nam Et. Cum Id Ut Morbi Porta
                Massa In Sollicitudin? Vitae, Congue Lobortis Dui Eget Risus
                Nibh Amet Sapien Oreper. Eget Amet Orci Interdum. Eget Orci
                Vitae Amet Amet Eget Amet Vitae, Pellentesque Nam Et.
              </p>
              {/* <Button className="bg-button px-4 py-2">Register Now</Button> */}
            </div>
          </div>
        </div>

        {/* Third Featured Product - Duplicate of first */}
        <div className="relative flex flex-col md:flex-row  rounded-lg overflow-hidden mb-12">
          <div className="w-1/2">
            <div className="absolute top-0 bottom-0 left-0 w-12 bg-red-700 flex flex-col items-center justify-center">
              <div className="transform -rotate-90 whitespace-nowrap text-center font-bold text-sm">
                MOLESTIE
              </div>
            </div>

            {/* Middle content */}
            <div className="ml-12 md:pl-6 pr-4 py-6  mt-12 ">
              <h2 className="text-2xl font-bold mb-6">Morbi Egestasinnon</h2>
              <p className="text-description text-sm mb-6 max-w-xl">
                Amet et Ultrices in Viverra Volutpat. Lorem Tellus Euismod Enim
                Amet Nullam Interdum Quamlibel Morbi Placerat Vivamus Sed Morbi
                Pretium. Sit Aenean Pellentesque Nam Et. Cum Id Ut Morbi Porta
                Massa In Sollicitudin? Vitae, Congue Lobortis Dui Eget Risus
                Nibh Amet Sapien Oreper. Eget Amet Orci Interdum. Eget Orci
                Vitae Amet Amet Eget Amet Vitae, Pellentesque Nam Et.
              </p>
              {/* <Button className="bg-button px-4 py-2">Register Now</Button> */}
            </div>
          </div>

          {/* Image on the right */}
          <div className="hidden md:block md:w-1/2 mx-auto">
            <img
              src="/assests/wholesales.png"
              alt="Happy student with clipboard"
              className="h-[90%] w-3/4 mx-auto rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Footer section */}
      <footer className=" pt-8 pb-12">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-6 md:mb-0 flex flex-col space-y-5">
              <p className=" text-sm">
                All products are proudly made in the USA
              </p>
              <p className=" text-sm">
                All products are third party lab tested
              </p>
              <p className=" text-sm">
                All products contain less than 0.3% Delta 9 THC
              </p>
            </div>

            <div className="text-right">
              <h3 className="text-gray-300 font-bold mb-2">INQUIRIES</h3>
              <p className=" text-sm">Email: Sales@DisCo.com</p>
              <Link
                href="/wholesale"
                className="text-red-500 text-sm hover:text-red-400"
              >
                Wholesale Registration
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

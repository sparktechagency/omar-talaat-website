import React from 'react'
import { GiPodiumWinner } from 'react-icons/gi';
import { GrDeliver } from "react-icons/gr";
import { ImPriceTags } from "react-icons/im";
import { IoGiftSharp } from 'react-icons/io5';

const Ficilities = () => {
  return (
    <div className="py-[51px] bg-[#181818] mt-16  " >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <div className="w-full mx-auto m-2 text-center">
          <div className="text-center">
            <GrDeliver className="flex justify-center items-center w-full text-4xl mb-2" />
          </div>
          <p>Shipping to AD, DxB and SHJ</p>
        </div>
        <div className="w-full mx-auto m-2 text-center">
          <div className="text-center">
            <ImPriceTags className="flex justify-center items-center w-full text-4xl mb-2" />
          </div>
          <p>150+ corals to pick from</p>
        </div>
        <div className="w-full mx-auto m-2 text-center">
          <div className="text-center">
            <GiPodiumWinner className="flex justify-center items-center w-full text-4xl mb-2" />
          </div>
          <p>Rare and unique corals</p>
        </div>
        <div className="w-full mx-auto m-2 text-center">
          <div className="text-center">
            <IoGiftSharp className="flex justify-center items-center w-full text-4xl mb-2" />
          </div>
          <p>Established Frags</p>
        </div>
      </div>
    </div>
  );
}

export default Ficilities

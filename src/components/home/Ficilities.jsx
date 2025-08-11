"use client"
import React from 'react'
import { GiPodiumWinner } from 'react-icons/gi';
import { GrDeliver } from "react-icons/gr";
import { ImPriceTags } from "react-icons/im";
import { IoGiftSharp } from 'react-icons/io5';
import { CarIcon, CoralsIcon, GiftIcon, TagIcon } from '../share/svg/FicilitiesIcon';
import { useGetMyWalletQuery } from '@/redux/featured/auth/authApi';
import { getUserPlan } from '../share/utils/getUserPlan';

const Ficilities = () => {
  const { data: wallet } = useGetMyWalletQuery();
  const walletData=wallet?.data 
  const { plan, classes,svgColor  }=getUserPlan(walletData)
  return (
    <div className="py-[51px] bg-[#181818] mt-16 px-10 " >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <div className="w-full mx-auto m-2 text-center">
          <div className="flex justify-center items-center hover:scale-115 w-full  mb-4">
            
            <CarIcon className="" color={svgColor}/>
          </div>
          <p>Shipping to AD, DxB and SHJ</p>
        </div>
        <div className="w-full mx-auto m-2 text-center ">
          <div className="text-center flex hover:scale-115 justify-center items-center mb-4">
            
            <TagIcon className="" color={svgColor}/>
          </div>
          <p>150+ corals to pick from</p>
        </div>
        <div className="w-full mx-auto m-2 text-center">
          <div className="flex justify-center items-center hover:scale-115 w-full  mb-4">
            
            <CoralsIcon  color={svgColor}/>
          </div>
          <p>Rare and unique corals</p>
        </div>
        <div className="w-full mx-auto m-2 text-center">
          <div className="flex justify-center items-center hover:scale-115 w-full  mb-4">
            
            <GiftIcon  color={svgColor}/>
          </div>
          <p>Established Frags</p>
        </div>
      </div>
    </div>
  );
}

export default Ficilities

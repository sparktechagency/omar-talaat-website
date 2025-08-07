"use client"
import React from 'react'
import ShopCategories from '../ShopCategories'
import CategoryProducts from './CategoryProducts'
import LeftCategory from './LeftCategory'
import CoralShopGrid from '../Products'
import AllCategories from './LeftCategory'
import { useGetSingleCategoryQuery } from '@/redux/featured/category/categoryApi'
import { useParams } from 'next/navigation'

const CategroyDetailsContainer = () => {
  const {id}=useParams()
  const {data} =useGetSingleCategoryQuery(id)
  const categoryName = data?.data?.name
  return (
    <div>
          <AllCategories />
          {/* <CategoryProducts /> */}
          <CoralShopGrid defaultCategory={categoryName} />
    </div>
  )
}

export default CategroyDetailsContainer

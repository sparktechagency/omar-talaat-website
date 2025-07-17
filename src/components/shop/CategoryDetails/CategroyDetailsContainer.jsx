import React from 'react'
import ShopCategories from '../ShopCategories'
import CategoryProducts from './CategoryProducts'
import LeftCategory from './LeftCategory'
import CoralShopGrid from '../Products'
import AllCategories from './LeftCategory'

const CategroyDetailsContainer = () => {
  return (
    <div>
          <AllCategories />
          {/* <CategoryProducts /> */}
          <CoralShopGrid />
    </div>
  )
}

export default CategroyDetailsContainer

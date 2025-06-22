import React from 'react'
import ShopCategories from '../ShopCategories'
import CategoryProducts from './CategoryProducts'
import LeftCategory from './LeftCategory'
import CoralShopGrid from '../Products'

const CategroyDetailsContainer = () => {
  return (
    <div>
          <LeftCategory />
          {/* <CategoryProducts /> */}
          <CoralShopGrid />
    </div>
  )
}

export default CategroyDetailsContainer

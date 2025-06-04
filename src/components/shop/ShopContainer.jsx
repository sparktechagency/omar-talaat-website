import React from 'react'
import ShopBanner from './ShopBanner'
import ProductsList from './ProductsList'
import ShopCategories from './ShopCategories'
import CoralShopGrid from './Products'

const ShopContainer = () => {
  return (
    <div className=''>
      <ShopCategories />
      <CoralShopGrid />
      {/* <ShopBanner />
      <ProductsList /> */}
    </div>
  )
}

export default ShopContainer

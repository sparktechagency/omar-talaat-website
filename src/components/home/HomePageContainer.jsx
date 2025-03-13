import React from 'react'
import Banner from './Banner'
import FAQSection from './FaqSection'
import ReviewsSection from './ReviewsSection'

const HomePageContainer = () => {
  return (
    <div>
      <Banner />
      <ReviewsSection />
      <FAQSection />
    </div>
  )
}

export default HomePageContainer

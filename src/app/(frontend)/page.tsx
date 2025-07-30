import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import LayoutWrapper from './components/layout/LayoutWrapper'
import WelcomeSection from './components/WelcomeSection'
import TopOffersSection from './components/TopOffersSection'
import ReviewsSection from './components/ReviewsSection'
import AboutUsSection from './components/AboutUsSection'
import SubscribeSection from './components/SubscribeSection'

import '../../../css/style.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const findResult = await payload.findGlobal({
    slug: 'main-page',
    depth: 2,
  })

  if (!findResult) {
    return notFound()
  }

  const productTypes = await payload.find({
    collection: 'property-types',
    pagination: false,
    depth: 1,
    limit: 100,
    select: { name: true },
  })

  return (
    <LayoutWrapper>
      <main>
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'hero-section') {
            return <WelcomeSection key={idx} data={section} productTypes={productTypes.docs} />
          }
        })}
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'top-offers') {
            return <TopOffersSection key={idx} data={section} />
          }
        })}
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'reviews') {
            return <ReviewsSection key={idx} data={section} />
          }
        })}
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'about-us') {
            return <AboutUsSection key={idx} data={section} />
          }
        })}
        <SubscribeSection />
      </main>
    </LayoutWrapper>
  )
}

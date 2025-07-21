import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import LayoutWrapper from './components/layout/LayoutWrapper'

import '../../../css/style.css'
import WelcomeSection from './components/WelcomeSection'

export default async function HomePage() {
  const headers = await getHeaders()
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
        {(findResult.mainPage || []).map((section, idx) => {
          if (section.blockType === 'hero-section') {
            return <WelcomeSection key={idx} data={section} productTypes={productTypes.docs} />
          }
        })}
      </main>
    </LayoutWrapper>
  )
}

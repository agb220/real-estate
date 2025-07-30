import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import LayoutWrapper from '../components/layout/LayoutWrapper'

import '../../../../css/style.css'

export default async function OffersPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return (
    <LayoutWrapper>
      <main></main>
    </LayoutWrapper>
  )
}

import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'
import config from '@/payload.config'
import LayoutWrapper from './components/layout/LayoutWrapper'

import '../../../css/style.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return <LayoutWrapper />
}

import React from 'react'
import './globals.css'

import { Poppins } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import { cn } from '@/utilities/cn'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--poppins-font',
})

const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--open_sans-font',
})

export const metadata = {
  description: 'Modern living for everyone',
  title: 'Real Estate',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={cn(poppins.variable, open_sans.variable)}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

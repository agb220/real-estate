import React from 'react'
import { Poppins } from 'next/font/google'
import { Open_Sans } from 'next/font/google'

import '../../../css/style.css'

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
    <html lang="en" className={`${poppins.variable} ${open_sans.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/images/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/images/site.webmanifest" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

'use client'

import { usePathname, useRouter } from 'next/navigation'

export const useScrollToSection = () => {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (id: string) => {
    if (pathname === '/') {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      router.push(`/#${id}`)
    }
  }

  return scrollToSection
}

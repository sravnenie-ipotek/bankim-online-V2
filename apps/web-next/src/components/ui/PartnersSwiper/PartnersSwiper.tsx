'use client'

import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import type { BankSlide } from './interfaces/BankSlide'

const BANK_SLIDES: BankSlide[] = [
  { name: 'Bank Leumi', link: '/banks/leumi', logo: '/static/bankleumilogo-1.svg' },
  { name: 'Discount Bank', link: '/banks/discount', logo: '/static/discountbank.svg' },
  { name: 'Bank Beinleumi', link: '/banks/beinleumi', logo: '/static/bank-igud-logo.svg' },
  { name: 'Bank of Jerusalem', link: '/banks/jerusalem', logo: '/static/mobile/banki184-jers.svg' },
  { name: 'Bank Hapoalim', link: '/banks/apoalim', logo: '/static/bankhapoalim.svg' },
  { name: 'Mercantile Discount', link: '/banks/mercantile-discount', logo: '/static/bank-of-israel-symbol.svg' },
]

const SCROLL_STEP_PX = 280

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PartnersSwiper: React.FC = () => {
  const { t } = useTranslation()
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleImageError = (name: string) => {
    setFailedImages((prev) => new Set(prev).add(name))
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_STEP_PX, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_STEP_PX, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative flex flex-col gap-8 w-full text-[1.13rem] text-[#e7e9ea] overflow-hidden max-[1280px]:px-5">
      <div className="text-[1.125rem] font-medium text-[#e7e9ea]">
        <span>{t('banks_partners')}</span>
      </div>

      <div className="relative w-full flex items-center gap-2" style={{ height: 100 }}>
        <button
          type="button"
          onClick={scrollLeft}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-[#333535] bg-base-secondary text-white hover:bg-base-base800 transition-colors rtl:rotate-180"
          aria-label={t('back')}
        >
          <ChevronLeftIcon />
        </button>
        <div className="relative min-w-0 shrink" style={{ width: 1054, height: 100, maxWidth: '100%' }}>
          <div
            ref={scrollRef}
            className="flex gap-8 justify-center items-center overflow-x-auto overflow-y-hidden scrollbar-hide w-full h-full"
            style={{ height: 100 }}
          >
            {BANK_SLIDES.map((slide) => (
            <Link
              key={slide.name}
              href={slide.link}
              className="flex-shrink-0 grayscale transition-all duration-200 hover:grayscale-0 px-6 flex items-center justify-center h-full min-h-[100px]"
            >
              {failedImages.has(slide.name) ? (
                <div className="w-[120px] h-[60px] flex items-center justify-center text-sm text-textTheme-secondary bg-base-secondary rounded">
                  {slide.name}
                </div>
              ) : (
                <img
                  src={slide.logo}
                  alt={slide.name}
                  className="object-contain w-auto h-auto"
                  style={{ maxWidth: 120, maxHeight: 100 }}
                  onError={() => handleImageError(slide.name)}
                />
              )}
            </Link>
          ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollRight}
          className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-[#333535] bg-base-secondary text-white hover:bg-base-base800 transition-colors rtl:rotate-180"
          aria-label={t('button_next')}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

export default PartnersSwiper

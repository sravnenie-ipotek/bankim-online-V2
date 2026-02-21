'use client'

import React, { useRef, useState } from 'react'
import { useContentApi } from '@hooks/useContentApi'
import type { BankSlide } from './interfaces/BankSlide'
import PartnerSlide from './PartnerSlide'

const BANK_SLIDES: BankSlide[] = [
  { name: 'Bank Leumi', link: '/banks/leumi', logo: '/static/bankleumilogo-1.svg' },
  { name: 'Discount Bank', link: '/banks/discount', logo: '/static/discountbank.svg' },
  { name: 'Bank Beinleumi', link: '/banks/beinleumi', logo: '/static/bank-igud-logo.svg' },
  { name: 'Bank of Jerusalem', link: '/banks/jerusalem', logo: '/static/mobile/banki184-jers.svg' },
  { name: 'Bank Hapoalim', link: '/banks/apoalim', logo: '/static/bankhapoalim.svg' },
  { name: 'Mercantile Discount', link: '/banks/mercantile-discount', logo: '/static/bank-of-israel-symbol.svg' },
]

/** Breakpoint-based: xs 375 | sm 768 | md 1024 | lg 1440 | xl 1920. Frame lg: 1128×145, xl: 1504×200. Box lg: 198×100, xl: 264×133. Icon lg: 150×42, xl: 200×56. Arrow lg: 32px, xl: 43px. */
const GAP_PX = 16
const BOX_WIDTH_LG = 198

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20 24L12 16L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 8L20 16L12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const PartnersSwiper: React.FC = () => {
  const { getContent } = useContentApi('home_page')
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLAnchorElement>(null)

  const handleImageError = (name: string) => {
    setFailedImages((prev) => new Set(prev).add(name))
  }

  const getScrollStep = (): number => {
    if (firstCardRef.current) {
      const width = firstCardRef.current.offsetWidth
      return width + GAP_PX
    }
    return BOX_WIDTH_LG + GAP_PX
  }

  const scrollPrev = () => {
    if (!scrollRef.current) return
    const isRtl = document.documentElement.dir === 'rtl'
    const step = getScrollStep()
    scrollRef.current.scrollBy({ left: isRtl ? step : -step, behavior: 'smooth' })
  }

  const scrollNext = () => {
    if (!scrollRef.current) return
    const isRtl = document.documentElement.dir === 'rtl'
    const step = getScrollStep()
    scrollRef.current.scrollBy({ left: isRtl ? -step : step, behavior: 'smooth' })
  }

  return (
    <div className="relative flex flex-col gap-8 w-full text-[#e7e9ea] overflow-hidden px-0 sm:px-5 text-[clamp(0.9rem,0.85rem+0.4vw,1.13rem)]">
      <div className="font-medium text-[#e7e9ea] text-[clamp(0.9rem,0.85rem+0.35vw,1.125rem)]">
        <span>{getContent('banks_partners')}</span>
      </div>

      <div className="relative w-full max-w-full mx-auto flex items-center justify-center gap-2 h-[100px] sm:h-[120px] md:h-[133px] lg:h-[145px] xl:h-[200px] w-full lg:max-w-[1128px] xl:max-w-[1504px]">
        <button
          type="button"
          onClick={scrollPrev}
          className="shrink-0 flex items-center justify-center rounded-full border border-[#333535] bg-base-secondary text-white hover:bg-base-base800 transition-colors rtl:rotate-180 w-8 h-8 lg:w-8 lg:h-8 xl:w-[43px] xl:h-[43px]"
          aria-label={getContent('back')}
        >
          <ChevronLeftIcon />
        </button>
        <div className="relative min-w-0 flex-1 flex items-center justify-center h-[100px] sm:h-[120px] md:h-[133px] lg:h-[145px] xl:h-[200px]">
          <div
            ref={scrollRef}
            className="flex justify-start items-center overflow-x-auto overflow-y-hidden scrollbar-hide w-full h-full scroll-smooth gap-4"
          >
            {BANK_SLIDES.map((slide, index) => (
              <PartnerSlide
                key={slide.name}
                partner={slide}
                isFailed={failedImages.has(slide.name)}
                onImageError={() => handleImageError(slide.name)}
                boxClassName="w-[198px] h-[100px] sm:w-[198px] sm:h-[100px] lg:w-[198px] lg:h-[100px] xl:w-[264px] xl:h-[133px]"
                iconClassName="w-[150px] h-[42px] sm:w-[150px] sm:h-[42px] lg:w-[150px] lg:h-[42px] xl:w-[200px] xl:h-[56px]"
                innerRef={index === 0 ? firstCardRef : undefined}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollNext}
          className="shrink-0 flex items-center justify-center rounded-full border border-[#333535] bg-base-secondary text-white hover:bg-base-base800 transition-colors rtl:rotate-180 w-8 h-8 lg:w-8 lg:h-8 xl:w-[43px] xl:h-[43px]"
          aria-label={getContent('button_next')}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}

export default PartnersSwiper

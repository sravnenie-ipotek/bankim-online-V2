'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useContentApi } from '@hooks/useContentApi'

/**
 * Dedicated footer for lawyers/real-estate pages.
 * Eliminates the duplication found in the original TemporaryFranchise
 * and TendersForLawyers pages that each rendered their own footer.
 */
const LawyersFooter: React.FC = () => {
  const { getContent } = useContentApi('global_components')

  const companyLinks = [
    { label: getContent('footer_about'), path: '/about' },
    { label: getContent('footer_contacts'), path: '/contacts' },
    { label: getContent('footer_vacancy'), path: '/vacancies' },
    { label: getContent('footer_partner'), path: '/cooperation' },
  ]

  const legalLinks = [
    { label: getContent('footer_legal_1'), path: '/terms' },
    { label: getContent('footer_legal_2'), path: '/privacy-policy' },
    { label: getContent('footer_legal_3'), path: '/cookie' },
    { label: getContent('footer_legal_4'), path: '/refund' },
  ]

  return (
    <footer className="bg-white py-8 pb-4 w-full border-t border-[#E5E5E5]">
      <div className="w-full max-[1280px]:px-5 lg:max-w-[1130px] xl:max-w-[1507px] mx-auto">
        <div className="flex justify-between items-start gap-20 mb-8 md:flex-col md:gap-10">
          <div className="flex flex-col gap-6 shrink-0 md:items-center md:text-center">
            <Image
              src="/static/menu/techRealt.png"
              alt="TechRealt Logo"
              width={160}
              height={33}
              className="object-contain"
            />
          </div>

          <div className="flex gap-16 sm:flex-col sm:gap-8">
            <div>
              <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4 uppercase tracking-wider">
                {getContent('footer_company')}
              </h3>
              <div className="flex flex-col gap-3">
                {companyLinks.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-sm text-[#666] no-underline transition-colors hover:text-[#FF4B49]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4 uppercase tracking-wider">
                {getContent('footer_contacts')}
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[#666]">
                <span>info@bankimonline.com</span>
                <span>+972 04-623-2280</span>
                <span>{getContent('footer_writeus')}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#1a1a2e] mb-4 uppercase tracking-wider">
                {getContent('footer_legal')}
              </h3>
              <div className="flex flex-col gap-3">
                {legalLinks.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-sm text-[#666] no-underline transition-colors hover:text-[#FF4B49]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] pt-4 text-center">
          <div className="text-xs text-[#999]">{getContent('footer_copyright')}</div>
        </div>
      </div>
    </footer>
  )
}

export default LawyersFooter

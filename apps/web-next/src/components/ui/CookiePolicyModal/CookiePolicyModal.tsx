'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useContentApi } from '@hooks/useContentApi'

interface CookiePolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

const CookiePolicyModal: React.FC<CookiePolicyModalProps> = ({ isOpen, onClose }) => {
  const { getContent } = useContentApi('legal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(id)
  }, [])

  if (!isOpen || !mounted) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const COOKIE_TYPES = ['essential', 'functional', 'analytics', 'marketing'] as const
  const SECTIONS = ['consent', 'personal_data', 'sharing', 'management', 'mobile', 'logging', 'updates', 'contact'] as const

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] p-5 max-[768px]:p-2.5"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#2a2b31] rounded-lg w-full max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center py-6 px-8 border-b border-[#424545]">
          <h2 className="font-medium text-white text-[clamp(1.25rem,1.2rem+0.35vw,1.5rem)]">
            {getContent('cookie_policy_title')}
          </h2>
          <button
            className="p-2 rounded hover:bg-white/10 transition-colors"
            onClick={onClose}
            aria-label={getContent('cookie_policy_close')}
          >
            <img src="/static/x.svg" width="24" height="24" alt="" className="brightness-0 invert" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 max-[768px]:p-6">
          <p className="text-white mb-8 leading-relaxed text-[clamp(0.875rem,0.85rem+0.25vw,1rem)]">
            {getContent('cookie_policy_intro')}
          </p>

          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 text-[clamp(1.125rem,1rem+0.35vw,1.25rem)]">{getContent('cookie_policy_what_are')}</h3>
            <p className="text-white leading-relaxed text-[clamp(0.8125rem,0.8rem+0.2vw,0.875rem)]">{getContent('cookie_policy_what_are_text')}</p>
          </div>

          <div className="mb-8">
            <h3 className="font-medium text-white mb-4 text-[clamp(1.125rem,1rem+0.35vw,1.25rem)]">{getContent('cookie_policy_types')}</h3>
            {COOKIE_TYPES.map((type) => (
              <div className="mb-6 pl-4" key={type}>
                <h4 className="font-medium text-white mb-3 text-[clamp(1rem,0.95rem+0.3vw,1.125rem)]">{getContent(`cookie_policy_${type}`)}</h4>
                <p className="text-white leading-relaxed text-[clamp(0.8125rem,0.8rem+0.2vw,0.875rem)]">{getContent(`cookie_policy_${type}_text`)}</p>
              </div>
            ))}
          </div>

          {SECTIONS.map((section) => (
            <div className="mb-8" key={section}>
              <h3 className="font-medium text-white mb-4 text-[clamp(1.125rem,1rem+0.35vw,1.25rem)]">{getContent(`cookie_policy_${section}`)}</h3>
              <p className="text-white leading-relaxed text-[clamp(0.8125rem,0.8rem+0.2vw,0.875rem)]">{getContent(`cookie_policy_${section}_text`)}</p>
            </div>
          ))}
        </div>

        <div className="py-6 px-8 border-t border-[#424545] flex justify-end">
          <button
            className="bg-[#fbe54d] text-[#2a2b31] py-3 px-6 rounded-md font-medium hover:bg-[#f9e136] transition-all text-[clamp(0.875rem,0.85rem+0.25vw,1rem)]"
            onClick={onClose}
          >
            {getContent('cookie_policy_close')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default CookiePolicyModal

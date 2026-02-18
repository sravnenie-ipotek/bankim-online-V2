'use client'

import React, { useState } from 'react'

import { CONTACT_SECTIONS, SOCIAL_LINKS } from './constants'
import type { TabId } from './interfaces/ContactSection'
import Container from '@/components/ui/Container/Container'
import { useContentApi } from '@hooks/useContentApi'
import { trackClick } from '@/helpers/analytics'

export default function Contacts() {
  const { getContent } = useContentApi('contacts')
  const [activeTab, setActiveTab] = useState<TabId>('general')

  const activeSection = CONTACT_SECTIONS.find((s) => s.id === activeTab)

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        <h1 className="text-5xl font-medium text-textTheme-primary sm:text-[1.9375rem]">
          {getContent('contacts_title')}
        </h1>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-textTheme-primary">
            {getContent('contacts_main_office')}
          </h2>
          <p className="text-textTheme-secondary">{getContent('contacts_address')}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {CONTACT_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === section.id
                  ? 'bg-accent-primary text-base-primary'
                  : 'bg-base-secondary text-textTheme-secondary hover:bg-base-base800'
              }`}
            >
              {getContent(section.labelKey)}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        {activeSection && (
          <div className="flex flex-col gap-4 p-6 bg-base-secondary rounded-lg">
            <h3 className="text-lg font-semibold text-textTheme-primary">
              {getContent(activeSection.labelKey)}
            </h3>
            {activeSection.items.map((item) => {
              const value = getContent(item.valueKey)
              return (
                <div key={item.valueKey} className="flex flex-col gap-1">
                  <span className="text-sm text-textTheme-secondary">
                    {getContent(item.labelKey)}
                  </span>
                  {item.type === 'phone' ? (
                    <a
                      href={`tel:${value}`}
                      className="text-accent-primary hover:underline"
                      onClick={() => trackClick('contact_phone', item.valueKey)}
                    >
                      {value}
                    </a>
                  ) : item.type === 'email' ? (
                    <a
                      href={`mailto:${value}`}
                      className="text-accent-primary hover:underline"
                      onClick={() => trackClick('contact_email', item.valueKey)}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-textTheme-primary">{value}</span>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Social Links */}
        <div className="flex gap-4 mt-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-base-secondary hover:bg-base-base800 transition-colors"
              aria-label={link.name}
              onClick={() => trackClick('contact_social', link.name)}
            >
              <img src={link.icon} alt={link.name} width={24} height={24} />
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
}

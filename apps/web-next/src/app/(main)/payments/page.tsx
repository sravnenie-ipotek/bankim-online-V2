'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container/Container'
import { useContentApi } from '@hooks/useContentApi'

type TabType = 'cards' | 'history'

export default function Payments() {
  const { getContent } = useContentApi('common')
  const [activeTab, setActiveTab] = useState<TabType>('cards')

  return (
    <Container>
      <div className="flex flex-col gap-8 w-full my-8">
        <div className="flex items-center gap-4">
          <Link href="/personal-cabinet" className="text-accent-primary hover:underline">{getContent('personal_cabinet_title')}</Link>
          <span className="text-textTheme-secondary">/</span>
          <span className="text-textTheme-primary">{getContent('payments')}</span>
        </div>

        <h1 className="text-3xl font-medium text-textTheme-primary">{getContent('payments')}</h1>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'cards' ? 'bg-accent-primary text-base-primary' : 'bg-base-secondary text-textTheme-secondary hover:bg-base-base800'
            }`}
          >
            {getContent('payment_cards')}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'history' ? 'bg-accent-primary text-base-primary' : 'bg-base-secondary text-textTheme-secondary hover:bg-base-base800'
            }`}
          >
            {getContent('payment_history')}
          </button>
        </div>

        <div className="p-8 bg-base-secondary rounded-lg">
          {activeTab === 'cards' ? (
            <div className="flex flex-col gap-4">
              <p className="text-textTheme-secondary">{getContent('no_payment_cards')}</p>
              <button className="px-6 py-3 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors w-fit">
                {getContent('add_card')}
              </button>
            </div>
          ) : (
            <p className="text-textTheme-secondary">{getContent('no_payment_history')}</p>
          )}
        </div>
      </div>
    </Container>
  )
}

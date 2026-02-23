'use client';

import React from 'react';
import PersonalCabinetSection from '@/components/ui/PersonalCabinetSection/PersonalCabinetSection';

const CreditHistoryConsent: React.FC = () => {
  return (
    <PersonalCabinetSection
      titleKey="credit_history_consent"
      descriptionKey="credit_history_consent_description"
    />
  );
};

export default CreditHistoryConsent;

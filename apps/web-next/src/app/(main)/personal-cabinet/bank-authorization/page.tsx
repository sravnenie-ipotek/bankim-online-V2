'use client';

import React from 'react';
import PersonalCabinetSection from '@/components/ui/PersonalCabinetSection/PersonalCabinetSection';

const BankAuthorization: React.FC = () => {
  return (
    <PersonalCabinetSection
      titleKey="bank_authorization"
      descriptionKey="bank_authorization_description"
    />
  );
};

export default BankAuthorization;

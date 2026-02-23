'use client';

import React from 'react';
import PersonalCabinetSection from '@/components/ui/PersonalCabinetSection/PersonalCabinetSection';

const CoBorrowerIncomeData: React.FC = () => {
  return (
    <PersonalCabinetSection
      titleKey="co_borrower_income_data"
      descriptionKey="co_borrower_income_description"
    />
  );
};

export default CoBorrowerIncomeData;

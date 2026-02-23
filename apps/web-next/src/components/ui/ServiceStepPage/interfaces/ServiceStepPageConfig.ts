import type { ReactNode } from 'react';

export interface ServiceStepPageConfig {
  basePath: string;
  totalSteps: number;
  titleContentKey: string;
  progressStepKeys: string[];
  getStepTitleContentKey: (step: number) => string;
  lastStepNextUrl: string;
  firstStepBackUrl: string | null;
  nextButtonContentKey?: string;
  submitButtonContentKey?: string;
  backButtonContentKey?: string;
  renderStepContent: (step: number, getContent: (key: string) => string) => ReactNode;
}

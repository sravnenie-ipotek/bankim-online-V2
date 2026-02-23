export interface BankWorkerStatusData {
  id: string;
  status: string;
  name: string;
  bank: string;
  position?: string;
  nextSteps?: string[];
  message?: string;
  timeline?: Array<{ date: string; event: string }>;
}

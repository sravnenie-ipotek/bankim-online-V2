import type { AdminUser } from './AdminUser';
import type { BankWorkerInvitation } from '@/interfaces/BankWorkerInvitation';
import type { BankWorkerApprovalItem } from '@/interfaces/BankWorkerApprovalItem';

export interface AdminState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  stats: {
    totalClients: number;
    totalAdmins: number;
    totalBanks: number;
    totalApplications: number;
    lastUpdated: string | null;
  };
  bankWorkerInvitations: BankWorkerInvitation[];
  bankWorkerApprovals: BankWorkerApprovalItem[];
  bankWorkerLoading: boolean;
}

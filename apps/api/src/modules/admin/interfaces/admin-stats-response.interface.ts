export interface AdminStatsResponse {
  status: 'success';
  data: {
    totalClients: number;
    totalBanks: number;
    totalApplications: number;
    totalAdmins: number;
  };
}

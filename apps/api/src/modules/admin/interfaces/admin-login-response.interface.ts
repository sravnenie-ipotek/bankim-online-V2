export interface AdminLoginResponse {
  status: 'success';
  message: string;
  data: {
    token: string;
    admin: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
}

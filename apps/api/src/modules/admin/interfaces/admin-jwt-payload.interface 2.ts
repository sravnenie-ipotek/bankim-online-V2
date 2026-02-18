export interface AdminJwtPayload {
  id: number;
  email: string;
  role: string;
  name: string;
  is_staff: boolean;
}

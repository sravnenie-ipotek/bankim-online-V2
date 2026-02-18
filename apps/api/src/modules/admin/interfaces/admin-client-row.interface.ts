export interface AdminClientRow {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_staff: boolean;
  password_hash: string | null;
}

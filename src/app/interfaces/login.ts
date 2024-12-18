export interface UserData {
  username: string | null;
  user_id: number;
  email: string;
  firstname: string;
  date_joined: string;
  last_join: string;
  is_employer: boolean;
}
export interface LoginResponse {
  token: string;
  username: string | null;
  user_id: number;
  email: string;
  firstname: string;
  date_joined: string;
  last_join: string;
  is_employer: boolean;
}

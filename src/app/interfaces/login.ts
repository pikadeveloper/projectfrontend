export interface UserData {
  username: string | null;
  user_id: number;
  email: string;
  firstname: string;
  date_joined: string;
  last_join: string;
  is_employer: boolean;
  has_empresa: boolean;    // Se añade para coincidir con LoginResponse
  token?: string;          // Opcional, en caso de que quieras unificar datos y evitar errores
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
  has_empresa: boolean;    // Ahora UserData también lo tiene
}

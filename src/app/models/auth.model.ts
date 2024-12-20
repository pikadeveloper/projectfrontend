export interface singupModel{
  email:string,
  password:string,
  firstname:string,
  lastname:string,
  address1:string,
  address2:string,
  is_employer:boolean,
  cellphone:string,
}

export interface AuthResData {
  success: boolean;
  username: string | null;
  user_id: number;
  email: string;
  firstname: string;
  date_joined: string;
  last_join: string;
  is_employer: boolean;
  has_empresa: boolean;
  message?: string;
}

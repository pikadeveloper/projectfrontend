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

export interface AuthResData{
  user_id?:string,
  email:string,
  firstname?:string,
  lastname?:string,
  address1?:string,
  address2?:string,
  is_employer?:boolean,
  cellphone?:string,
  token?:string
  success: boolean; // Indica si el registro fue exitoso
}

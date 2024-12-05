export interface UserData {
    isEmployer: boolean;
}

export interface LoginResponse{
    success:boolean;
    message: string;
    data: UserData;
}

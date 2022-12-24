export interface User extends BasicUser {
  password: string;
}

export interface LoginUser {
  email: string;
  id: number;
}

export interface LoginUserReq {
  user: LoginUser;
}

export interface BasicUser {
  id: number;
  username: string;
  email: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister extends UserLogin {
  username: string;
}

export type { UserLogin, UserRegister };

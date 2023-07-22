interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister extends UserLogin {
  name: string;
}

export type { UserLogin, UserRegister };

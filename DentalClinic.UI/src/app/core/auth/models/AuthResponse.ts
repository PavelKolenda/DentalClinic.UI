export interface AuthResponse{
  token: string;
  user: {
    id: string;
    name: string;
    surname: string;
    patronymic: string;
    email: string;
  },
  roles: string[]
}

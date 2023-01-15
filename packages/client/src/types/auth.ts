import type { UserDTO } from '../api/types';

export type AuthState = {
  isAuth: boolean;
  user: UserDTO | null;
  loading: boolean;
}

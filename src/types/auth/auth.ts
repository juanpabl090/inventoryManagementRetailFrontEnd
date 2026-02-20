export interface AuthRequest {
  userName: string;
  password: string;
}

export interface AuthRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

export interface MeResponse {
  id: number;
  userName: string;
  roles: string[];
}

export interface AuthContextType {
  user: MeResponse | null | undefined | unknown;
  checkSession: () => void;
  logIn: (request: AuthRequest) => void;
  logOut: () => void;
  loading: boolean;
}

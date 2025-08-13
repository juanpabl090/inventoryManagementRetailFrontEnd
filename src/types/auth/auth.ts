export interface AuthRequest {
  userName: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthContextType {
  accessToken: string | null;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
  refresh: () => void;
  isAuthenticated: boolean;
}

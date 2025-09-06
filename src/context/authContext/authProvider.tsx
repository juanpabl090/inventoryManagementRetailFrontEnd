import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import type { AuthResponse } from "../../types/auth/auth";
import { validToken } from "../../utils/tokenUtils";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("token") || ""
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (accessToken && validToken(accessToken)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setAccessToken("");
      localStorage.removeItem("token");
    }
  }, [accessToken]);

  const login = useCallback((response: AuthResponse) => {
    setAccessToken(response.token);
    localStorage.setItem("token", response.token);
  }, []);

  const logout = () => {
    // TODO: HACER LOGOUT TOKEN EN BACK END
    setAccessToken(null);
    localStorage.removeItem("token");
  };

  const refresh = () => {
    // TODO: HACER REFRESH TOKEN EN BACK END
    console.log("Refresh Token");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
};

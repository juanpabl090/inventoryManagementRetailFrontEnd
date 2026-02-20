import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import type { AuthRequest, MeResponse } from "../../types/auth/auth";
import useAuthMe from "../../hooks/auth/useAuthMe";
import useAuth from "../../hooks/auth/useAuth";
import useAuthLogOut from "../../hooks/auth/useAuthLogOut";
import { useNavigate } from "react-router";
import { useSessionCheck } from "../../hooks/auth/useSessionCheck";
import axiosInstance from "../../utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useSessionCheck();

  const [user, setUser] = useState<MeResponse | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: dataAuthMe, isLoading, error } = useAuthMe();
  const { mutate: loginMutate } = useAuth();
  const { mutate: logOut } = useAuthLogOut();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  useEffect(() => {
    const boostrap = async () => {
      try {
        await axiosInstance.post("/auth/refresh");
        await queryClient.invalidateQueries({ queryKey: ["auth-me"] });
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    boostrap();
  }, [queryClient]);

  useEffect(() => {
    if (isLoading) return;

    if (dataAuthMe) {
      setUser(dataAuthMe);
      setLoading(false);
    } else if (error) {
      setUser(null);
      setLoading(false);
    }
  }, [isLoading, dataAuthMe, error]);

  useEffect(() => {
    if (!loading && user && location.pathname === "/login") {
      navigate("/products", { replace: true });
    }
  }, [navigate, loading, user]);

  useEffect(() => {
    const protectedRoutes = [
      "/products",
      "/categories",
      "/productTypes",
      "/suppliers",
      "/purchases",
      "/sales",
      "/reports",
    ];
    const isProtectedRpute = protectedRoutes.some((route) => {
      return location.pathname.startsWith(route);
    });

    if (!loading && !user && isProtectedRpute) {
      navigate("/login", { replace: true });
    }
  }, [loading, navigate, user]);

  const checkSession = useCallback(() => {
    setLoading(isLoading);

    if (!dataAuthMe || error) {
      setUser(null);
      setLoading(false);
      return;
    }

    setUser(dataAuthMe);
    setLoading(false);
  }, [dataAuthMe, isLoading, error]);

  const login = useCallback(
    (request: AuthRequest) => {
      loginMutate(request);
    },
    [loginMutate],
  );

  const logout = useCallback(async () => {
    logOut();
  }, [logOut]);

  return (
    <AuthContext.Provider
      value={{ user, checkSession, logIn: login, logOut: logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

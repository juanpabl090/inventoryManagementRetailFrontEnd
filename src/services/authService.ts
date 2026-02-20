import type { AuthRequest, AuthRegisterRequest } from "../types/auth/auth";
import { API_PATHS } from "../constants/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const login = async (authRequest: AuthRequest) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, authRequest, {
    withCredentials: true,
  });
  return res.data;
};

export const logout = async () => {
  const data = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
  return data;
};

export const register = async (authRegisterRequest: AuthRegisterRequest) => {
  await axiosInstance.post(API_PATHS.AUTH.REGISTER, authRegisterRequest);
};

export const me = async () => {
  const res = await axiosInstance.get(API_PATHS.AUTH.ME);
  return res.data;
};

export const refreshToken = async () => {
  return await axiosInstance.post(API_PATHS.AUTH.REFRESH, {}, {withCredentials: true});
};

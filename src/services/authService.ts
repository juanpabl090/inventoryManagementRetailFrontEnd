import axios from "axios";
import type { AuthRequest } from "../types/auth/auth";

import { API_PATHS } from "../constants/apiPaths";

export const login = async (authRequest: AuthRequest) => {
  try {
    const res = await axios.post(
      API_PATHS.URL.BASE + API_PATHS.AUTH.LOGIN,
      authRequest,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data.messagge || "Hubo un error");
    }
    throw new Error("Hubo un error" + error);
  }
};

export const logout = () => {};

import { jwtDecode } from "jwt-decode";

export const validToken = (token: string) => {
  if (!token) return false;
  try {
    if (token.split(".").length !== 3) return false;
    const decoded: { exp: number } = jwtDecode(token);
    if (!decoded.exp) return false;
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch (e) {
    throw new Error("Token invalido", {
      cause: e,
    });
  }
};

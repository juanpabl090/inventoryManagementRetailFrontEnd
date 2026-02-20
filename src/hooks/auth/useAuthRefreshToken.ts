import { useMutation } from "@tanstack/react-query";
import { refreshToken } from "../../services/authService";
import { useNavigate } from "react-router";

export default function useAuthRefreshToken() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: refreshToken,
    mutationKey: ["refreshToken"],
    onSuccess: () => {
      navigate("/products");
    },
  });
}

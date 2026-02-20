import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router";

export default function useAuthLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    mutationKey: ["auth"],
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
}

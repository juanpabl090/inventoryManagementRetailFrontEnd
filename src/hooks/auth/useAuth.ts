import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authService";

export default function useAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth"],
    mutationFn: login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth-me"],
        type: "active",
      });
    },
  });
}

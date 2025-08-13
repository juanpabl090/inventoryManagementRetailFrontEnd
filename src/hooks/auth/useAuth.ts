import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginService } from "../../services/authService";

export default function useAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth"],
    mutationFn: loginService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/authService";
import { useNavigate } from "react-router";
import useAuthMe from "./useAuthMe";

export default function useAuthRegister() {
  const navigate = useNavigate();
  const { refetch: refetchAuthMe } = useAuthMe();
  return useMutation({
    mutationFn: register,
    mutationKey: ["auth-register"],
    onSuccess: async () => {
      navigate("/login");
      try {
        await refetchAuthMe();
      } catch (e) {
        console.log(e);
      }
      navigate("/");
    },
  });
}

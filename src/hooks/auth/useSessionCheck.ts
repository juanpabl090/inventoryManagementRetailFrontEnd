import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useSessionCheck() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const interval = setInterval(
      () => {
        queryClient.invalidateQueries({ queryKey: ["auth-me"] });
      },
      5 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, [queryClient]);
}

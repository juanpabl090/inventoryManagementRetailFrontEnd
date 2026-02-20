import { useQuery } from "@tanstack/react-query";
import { me } from "../../services/authService";
/* import { isAxiosError } from "axios"; */

export default function useAuthMe() {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: me,
    retry: /* (falilureCount, error) => {
      if (isAxiosError(error) && error?.response?.status === 401) {
        return false;
      }
      return falilureCount < 1;
    }, */ 1,
    refetchOnMount: true,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

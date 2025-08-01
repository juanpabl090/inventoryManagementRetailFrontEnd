import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/producService";

export default function useProducts<T = unknown>() {
  const { data, error, isLoading } = useQuery<T[], Error>({
    queryKey: ["product"],
    queryFn: getProduct,
  });

  return { data, isLoading, error };
}

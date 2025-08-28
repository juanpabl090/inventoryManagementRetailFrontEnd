import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../services/producService";
import type { Product } from "../../types/models/index";

export function useProducts() {
  const { data, error, isLoading, isSuccess, isError } = useQuery<
    Product[],
    Error
  >({
    queryKey: ["products"],
    queryFn: getAll,
  });

  return { data, isLoading, error, isSuccess, isError };
}

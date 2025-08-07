import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/producService";
import type { Product } from "../../types/types";

export function useProducts() {
  const { data, error, isLoading } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  return { data, isLoading, error };
}

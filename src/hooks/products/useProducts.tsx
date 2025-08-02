import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/producService";

export default function useProducts<Product>() {
  const { data, error, isLoading } = useQuery<Product[], Error>({
    queryKey: ["product"],
    queryFn: getProduct,
  });

  return { data, isLoading, error };
}

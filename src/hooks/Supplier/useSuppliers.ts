import { useQuery } from "@tanstack/react-query";
import type { Supplier } from "../../types/models";
import { getAll } from "../../services/SupplierService";

export const useSupplier = () => {
  const { data, error, isError, isSuccess, isLoading } = useQuery<
    Supplier[],
    Error
  >({
    queryKey: ["Supplier"],
    queryFn: getAll,
  });

  return { data, error, isError, isSuccess, isLoading };
};

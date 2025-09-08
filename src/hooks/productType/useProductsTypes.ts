import { useQuery } from "@tanstack/react-query";
import type { ProductType } from "../../types/models";
import { getAll } from "../../services/productTypeService";

export const useProductsTypes = () => {
  const { data, error, isError, isSuccess, isLoading } = useQuery<
    ProductType[],
    Error
  >({
    queryKey: ["ProductsTypes"],
    queryFn: getAll,
  });
  return { data, error, isError, isSuccess, isLoading };
};

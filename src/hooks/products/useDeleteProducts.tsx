import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteById } from "../../services/producService";

export default function useDeleteProducts() {
  const queryClient = useQueryClient();
  const { data, error, isPending, isSuccess, mutate } = useMutation<
    void,
    Error,
    number
  >({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { data, error, isPending, isSuccess, mutate };
}

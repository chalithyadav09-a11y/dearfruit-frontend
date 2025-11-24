import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/api-client";
import { toast } from "react-toastify";

const useCheckoutCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.post("/order/checkout").then((res) => res.data),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useCheckoutCart;

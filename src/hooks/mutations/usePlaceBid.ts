import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { BidFormFields } from "../../schemas/bidSchema";
import api from "../../utils/api";

export default function usePlaceBid(auctionId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BidFormFields) =>
      api.post(`auctions/${auctionId}/bids/`, data),

    onError: (error) => toast.error(error.message),

    onSuccess: () => toast.success("Bid placed succesfully"),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bids-history", auctionId] });
      queryClient.invalidateQueries({ queryKey: ["auction", auctionId] });
    },
  });
}

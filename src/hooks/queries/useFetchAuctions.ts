import { useSuspenseQuery } from "@tanstack/react-query";
import type { Auction } from "../../types/types";
import api from "../../utils/api";

export default function useFetchAuction(auctionId: number) {
  return useSuspenseQuery<Auction>({
    queryKey: ["auction", auctionId],
    queryFn: () => api.get(`auctions/${auctionId}/`).then((res) => res.data),
  });
}

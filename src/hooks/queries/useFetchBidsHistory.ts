import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { Bid } from "../../types/types";
import api from "../../utils/api";

export default function UseFetchBidsHistory(auctionId: number) {
  return useSuspenseInfiniteQuery<{
    results: Bid[];
    moreBidsAvailable: string | null;
  }>({
    queryKey: ["bids-history", auctionId],
    queryFn: ({ pageParam }) =>
      api.get(pageParam as string).then((res) => ({
        results: res.data.results,
        moreBidsAvailable: res.data.next,
      })),
    getNextPageParam: (lastPage) => lastPage.moreBidsAvailable,
    initialPageParam: `auctions/${auctionId}/bids/`,
  });
}

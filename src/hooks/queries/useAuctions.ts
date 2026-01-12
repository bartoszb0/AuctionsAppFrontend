import { useSuspenseQuery } from "@tanstack/react-query";
import type { Auction } from "../../types/types";
import api from "../../utils/api";

export default function useAuctions(
  baseQueryKey: string,
  searchParams: URLSearchParams,
  endpoint: string
) {
  return useSuspenseQuery<{
    results: Auction[];
    count: number;
  }>({
    queryKey: [baseQueryKey, searchParams.toString()],
    queryFn: () =>
      api
        .get(`${endpoint}?${searchParams.toString()}`)
        .then((res) => ({ results: res.data.results, count: res.data.count })),
  });
}

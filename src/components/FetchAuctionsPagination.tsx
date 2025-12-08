import { Flex } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { AUCTIONS_PER_PAGE } from "../constants/constants";
import type { Auction } from "../types/types";
import api from "../utils/api";
import AuctionsListing from "./AuctionsListing";
import PaginationComponent from "./PaginationComponent";

type FetchAuctionsPaginationProps = {
  endpoint: string;
  variant?: "default" | "wide";
  currentSize?: number;
  baseQueryKey: string;
};

export default function FetchAuctionsPagination({
  endpoint,
  variant = "default",
  currentSize = AUCTIONS_PER_PAGE,
  baseQueryKey,
}: FetchAuctionsPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const { data: auctions } = useSuspenseQuery<{
    results: Auction[];
    count: number;
  }>({
    queryKey: [baseQueryKey, searchParams.toString()],
    queryFn: () =>
      api
        .get(`${endpoint}?${searchParams.toString()}`)
        .then((res) => ({ results: res.data.results, count: res.data.count })),
  });

  return (
    <Flex mt="xl" direction="column" align="center">
      <AuctionsListing auctions={auctions.results} variant={variant} />
      <PaginationComponent
        currentPage={currentPage}
        allAuctionsCount={auctions.count}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        currentSize={currentSize}
      />
    </Flex>
  );
}

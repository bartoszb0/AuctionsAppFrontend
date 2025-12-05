import { Flex } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import type { Auction } from "../types/types";
import api from "../utils/api";
import AuctionsListing from "./AuctionsListing";
import PaginationComponent from "./PaginationComponent";

type FetchAuctionsPaginationProps = {
  endpoint: string;
  variant?: "default" | "wide";
};

export default function FetchAuctionsPagination({
  endpoint,
  variant = "default",
}: FetchAuctionsPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const fetchAuctions = async (): Promise<{
    results: Auction[];
    count: number;
  }> => {
    const response = await api.get(`${endpoint}?${searchParams.toString()}`);
    return { results: response.data.results, count: response.data.count };
  };

  const { data: auctions } = useSuspenseQuery({
    queryKey: ["auctions", searchParams.toString()],
    queryFn: fetchAuctions,
  });

  return (
    <Flex mt="xl" direction="column" align="center">
      <AuctionsListing auctions={auctions.results} variant={variant} />
      <PaginationComponent
        currentPage={currentPage}
        allAuctionsCount={auctions.count}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </Flex>
  );
}

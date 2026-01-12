import { Flex } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { AUCTIONS_PER_PAGE } from "../constants/constants";
import useAuctions from "../hooks/queries/useAuctions";
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

  const { data: auctions } = useAuctions(baseQueryKey, searchParams, endpoint);

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

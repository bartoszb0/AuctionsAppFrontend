import { Burger, Flex, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import FilterButtons from "../components/FilterButtons";
import Header from "../components/Header";
import NothingFound from "../components/NothingFound";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";
import type { Auction } from "../types";
import api from "../utils/api";
import displayError from "../utils/displayError";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function SearchResult() {
  const auth = isAuthenticated();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allAuctionsCount, setAllAuctionsCount] = useState(0);

  const currentPage = Number(searchParams.get("page") || 1);
  const currentSize = Number(searchParams.get("size") || 10);
  const currentOrdering = searchParams.get("ordering") || "-created_on";
  const currentFinishedAuctions = searchParams.get("closed") === "true";
  const currentMinBid = Number(searchParams.get("min_bid")) || "";
  const currentMaxBid = Number(searchParams.get("max_bid")) || "";

  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get(`auctions/?${searchParams.toString()}`);
        setAllAuctionsCount(response.data.count);
        setSearchResults(response.data.results);
      } catch (err) {
        displayError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [searchParams]);

  return (
    <>
      <Header auth={auth} />
      <Flex direction="column" gap="xl" align="center">
        <Flex direction="row" justify="center" align="center">
          <SearchInput searchParams={searchParams} />
          <Burger size="lg" mt="xl" ml="xl" opened={opened} onClick={toggle} />
        </Flex>
        {opened && (
          <FilterButtons
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            currentSize={currentSize}
            currentOrdering={currentOrdering}
            currentFinishedAuctions={currentFinishedAuctions}
            currentMinBid={currentMinBid}
            currentMaxBid={currentMaxBid}
          />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AuctionsListing auctions={searchResults} variant="wide" />
            <PaginationComponent
              currentPage={currentPage}
              allAuctionsCount={allAuctionsCount}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              currentSize={currentSize}
            />
          </>
        )}
        <NothingFound isLoading={isLoading} auctionArray={searchResults} />
      </Flex>
    </>
  );
}

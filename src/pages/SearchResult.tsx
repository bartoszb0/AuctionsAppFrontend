import { Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import FilterButtons from "../components/FilterButtons";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";
import type { Auction } from "../types";
import api from "../utils/api";
import displayError from "../utils/displayError";

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allAuctionsCount, setAllAuctionsCount] = useState(0);
  const currentPage = Number(searchParams.get("page") || 1);
  const currentSize = Number(searchParams.get("size") || 10);
  const currentOrdering = searchParams.get("ordering") || "-created_on";

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
    <Flex direction="column" gap="xl" align="center">
      <SearchInput searchParams={searchParams} />
      <FilterButtons
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        currentSize={currentSize}
        currentOrdering={currentOrdering}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <AuctionsListing auctions={searchResults} variant="search" />
          <PaginationComponent
            currentPage={currentPage}
            allAuctionsCount={allAuctionsCount}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            currentSize={currentSize}
          />
        </>
      )}
      {!isLoading && searchResults.length <= 0 && <h1>Nothing found</h1>}
    </Flex>
  );
}

import { Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import SearchInput from "../components/SearchInput";
import type { Auction } from "../types";
import api from "../utils/api";
import displayError from "../utils/displayError";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("query");
  const [searchResults, setSearchResults] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAuctions() {
    try {
      const response = await api.get(`auctions/?search=${searchParam}`);
      setSearchResults(response.data);
    } catch (err) {
      displayError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAuctions();
  }, [searchParam]);

  return (
    <Flex direction="column" gap="xl">
      <SearchInput displayFilterButtons={true} />
      {isLoading ? <Loader /> : <AuctionsListing auctions={searchResults} />}
      {!isLoading && searchResults.length <= 0 && <h1>Nothing found</h1>}
    </Flex>
  );
}

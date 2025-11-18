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
  const [searchResults, setSearchResults] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get(`auctions/?${searchParams.toString()}`);
        setSearchResults(response.data);
        console.log("xd");
      } catch (err) {
        displayError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [searchParams]);

  return (
    <Flex direction="column" gap="xl">
      <SearchInput displayFilterButtons={true} />
      {isLoading ? <Loader /> : <AuctionsListing auctions={searchResults} />}
      {!isLoading && searchResults.length <= 0 && <h1>Nothing found</h1>}
    </Flex>
  );
}

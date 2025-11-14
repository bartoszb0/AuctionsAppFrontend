import { Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import type { Auction } from "../types";
import api from "../utils/api";
import displayError from "../utils/displayError";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("query");
  const [searchResults, setSearchResults] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const resultsElement = searchResults.map((result: Auction) => {
    return <div key={result.id}>{result.name}</div>;
  });

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
      {isLoading ? <Loader /> : resultsElement}
      {!isLoading && resultsElement.length <= 0 && <h1>Nothing found</h1>}
    </Flex>
  );
}

import { Burger, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSearchParams } from "react-router-dom";
import DataContentWrapper from "../components/DataContentWrapper";
import FetchAuctionsPagination from "../components/FetchAuctionsPagination";
import FilterButtons from "../components/FilterButtons";
import SearchInput from "../components/SearchInput";

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSize = Number(searchParams.get("size") || 10);
  const currentOrdering = searchParams.get("ordering") || "-created_on";
  const currentFinishedAuctions = searchParams.get("closed") === "true";
  const currentMinBid = Number(searchParams.get("min_bid")) || "";
  const currentMaxBid = Number(searchParams.get("max_bid")) || "";

  const [opened, { toggle }] = useDisclosure();

  return (
    <>
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
      </Flex>
      <DataContentWrapper>
        <FetchAuctionsPagination
          endpoint={"auctions/"}
          variant="wide"
          currentSize={currentSize}
        />
      </DataContentWrapper>
    </>
  );
}

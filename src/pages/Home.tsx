import { Flex } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import Categories from "../components/Categories";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";
import type { Auction } from "../types/types";
import api from "../utils/api";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const fetchAuctions = async (): Promise<{
    results: Auction[];
    count: number;
  }> => {
    const response = await api.get(`auctions/?${searchParams.toString()}`);
    return { results: response.data.results, count: response.data.count };
  };

  const { data } = useSuspenseQuery({
    queryKey: ["auctions", searchParams.toString()],
    queryFn: fetchAuctions,
  });

  return (
    <>
      <Flex justify="center" direction="column" align="center" gap="sm">
        <SearchInput />
        <Categories />
        <Flex mt="xl" direction="column" align="center">
          <AuctionsListing auctions={data.results} />
          <PaginationComponent
            currentPage={currentPage}
            allAuctionsCount={data.count}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </Flex>
      </Flex>
    </>
  );
}

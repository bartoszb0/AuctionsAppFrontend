import { Flex, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import Categories from "../components/Categories";
import NothingFound from "../components/NothingFound";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";
import type { Auction } from "../types";
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

  const { data, isPending, error } = useQuery({
    queryKey: ["auctions", searchParams.toString()],
    queryFn: fetchAuctions,
  });

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Flex justify="center" direction="column" align="center" gap="sm">
        <SearchInput />
        <Categories />
        <Flex mt="xl" direction="column" align="center">
          {isPending || !data ? (
            <Loader />
          ) : (
            <>
              <AuctionsListing auctions={data.results} />
              <PaginationComponent
                currentPage={currentPage}
                allAuctionsCount={data.count}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </>
          )}
        </Flex>
        <NothingFound
          isLoading={isPending}
          auctionArray={data?.results ?? []}
        />
      </Flex>
    </>
  );
}

import { Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import Categories from "../components/Categories";
import Header from "../components/Header";
import NothingFound from "../components/NothingFound";
import PaginationComponent from "../components/PaginationComponent";
import SearchInput from "../components/SearchInput";
import api from "../utils/api";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function Home() {
  const [auth] = useState(isAuthenticated());
  const [auctions, setAuctions] = useState([]);
  const [allAuctionsCount, setAllAuctionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  useEffect(() => {
    const fetchAuctions = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`auctions/?${searchParams.toString()}`);
        setAllAuctionsCount(response.data.count);
        setAuctions(response.data.results);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [currentPage]);

  return (
    <>
      <Flex direction="column">
        <Header auth={auth} />
        <Flex justify="center" direction="column" align="center" gap="sm">
          <SearchInput />
          <Categories />
          <Flex mt="xl" direction="column" align="center">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <AuctionsListing auctions={auctions} />
                <PaginationComponent
                  currentPage={currentPage}
                  allAuctionsCount={allAuctionsCount}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              </>
            )}
          </Flex>
          <NothingFound isLoading={isLoading} auctionArray={auctions} />
        </Flex>
      </Flex>
    </>
  );
}

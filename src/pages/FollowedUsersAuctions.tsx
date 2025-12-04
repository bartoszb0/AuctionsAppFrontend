import { Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuctionsListing from "../components/AuctionsListing";
import Header from "../components/Header";
import NothingFound from "../components/NothingFound";
import PaginationComponent from "../components/PaginationComponent";
import type { Auction } from "../types";
import api from "../utils/api";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function FollowedUsersAuction() {
  const auth = isAuthenticated();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [allAuctionsCount, setAllAuctionsCount] = useState(0);
  const currentPage = Number(searchParams.get("page") || 1);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get(
          `auctions/followed/?${searchParams.toString()}`
        );
        setAllAuctionsCount(response.data.count);
        setAuctions(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, [searchParams]);

  return (
    <>
      <Header auth={auth} />
      <Flex align="center" justify="center" mt="xl" direction="column">
        <h1>Followed user's auction</h1>
      </Flex>
      <Flex align="center" justify="center" direction="column">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AuctionsListing auctions={auctions} variant="wide" />
            <PaginationComponent
              currentPage={currentPage}
              allAuctionsCount={allAuctionsCount}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </>
        )}
        <NothingFound isLoading={isLoading} auctionArray={auctions} />
      </Flex>
    </>
  );
}

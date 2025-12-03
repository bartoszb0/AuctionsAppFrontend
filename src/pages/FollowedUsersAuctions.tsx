import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import AuctionsListing from "../components/AuctionsListing";
import Header from "../components/Header";
import type { Auction } from "../types";
import api from "../utils/api";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function FollowedUsersAuction() {
  const auth = isAuthenticated();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get("auctions/followed/");
        setAuctions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <>
      <Header auth={auth} />
      <Flex align="center" justify="center" mt="xl" direction="column">
        <h1>Followed user's auction</h1>
        <AuctionsListing auctions={auctions} variant="wide" />
      </Flex>
    </>
  );
}

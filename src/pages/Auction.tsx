import { Flex, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Auction } from "../types";
import api from "../utils/api";

export default function Auction() {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);

  useEffect(() => {
    fetchAuction();
  }, [auctionId]);

  async function fetchAuction() {
    try {
      const response = await api.get(`auctions/${auctionId}`);
      console.log(response.data);
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching auction:", error);
    }
  }

  return (
    <>
      {!auction ? (
        <Flex align="center" justify="center" mt="xl">
          <Loader />
        </Flex>
      ) : (
        <>
          <h1>{auction.name}</h1>
        </>
      )}
    </>
  );
}

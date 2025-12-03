import { Flex, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import type { Auction, Bid } from "../../types";
import api from "../../utils/api";
import displayError from "../../utils/displayError";
import AuctionBidSection from "./AuctionBidSection";
import AuctionDescription from "./AuctionDescription";
import BidsHistory from "./BidsHistory";

export default function Auction() {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [highestBidAmount, setHighestBidAmount] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await api.get(`auctions/${auctionId}`);
        setAuction(response.data);
        setHighestBidAmount(response.data.highest_bid);
      } catch (error) {
        console.error("Error fetching auction:", error);
        displayError(error);
      }
    };

    fetchAuction();
  }, [auctionId]);

  const [bidsHistory, setBidsHistory] = useState<Bid[]>([]);

  return (
    <>
      <Header auth={false} />
      {!auction ? (
        <Flex align="center" justify="center" mt="xl">
          <Loader />
        </Flex>
      ) : (
        <>
          <AuctionDescription
            auction={auction}
            highestBidAmount={highestBidAmount}
          />

          {auction.closed ? (
            <Flex justify="center" mt="lg">
              <Text c="red" size="xl">
                AUCTION CLOSED
              </Text>
            </Flex>
          ) : (
            <AuctionBidSection
              auction={auction}
              setBidsHistory={setBidsHistory}
              setHighestBidAmount={setHighestBidAmount}
            />
          )}

          <hr style={{ margin: "30px", borderColor: "grey" }} />

          <BidsHistory
            auctionId={auction.id}
            bidsHistory={bidsHistory}
            setBidsHistory={setBidsHistory}
          ></BidsHistory>
        </>
      )}
    </>
  );
}

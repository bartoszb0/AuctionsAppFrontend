import { Flex } from "@mantine/core";
import type { Auction } from "../types";
import AuctionCard from "./AuctionCard";

type AuctionListingProps = {
  auctions: Auction[];
};

export default function AuctionsListing({ auctions }: AuctionListingProps) {
  return (
    <Flex justify="center" maw="1200" wrap="wrap" gap="sm">
      {auctions.map((auction: Auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </Flex>
  );
}

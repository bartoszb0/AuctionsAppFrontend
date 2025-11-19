import { Flex } from "@mantine/core";
import type { Auction } from "../types";
import AuctionCard from "./AuctionCard/AuctionCard";

type AuctionListingProps = {
  auctions: Auction[];
  variant?: "search";
};

export default function AuctionsListing({
  auctions,
  variant,
}: AuctionListingProps) {
  return (
    <Flex justify="center" maw="1200" wrap="wrap" gap="sm">
      {auctions.map((auction: Auction) => (
        <AuctionCard key={auction.id} auction={auction} variant={variant} />
      ))}
    </Flex>
  );
}

import { SimpleGrid, Text } from "@mantine/core";
import type { Auction } from "../types/types";
import AuctionCard from "./AuctionCard/AuctionCard";

type AuctionListingProps = {
  auctions: Auction[];
  variant?: "wide";
};

export default function AuctionsListing({
  auctions,
  variant,
}: AuctionListingProps) {
  const gridProps =
    variant === "wide"
      ? {
          cols: 1,
          spacing: "xs",
          verticalSpacing: "sm",
          w: "90%",
          maw: "1000px",
        }
      : {
          cols: { base: 2, md: 3 },
          spacing: "lg",
          verticalSpacing: "sm",
          w: "100%",
          maw: "1000px",
        };

  return (
    <>
      {auctions.length <= 0 && (
        <Text fs="italic" size="xl" mt="xl">
          No auction found
        </Text>
      )}
      <SimpleGrid {...gridProps}>
        {auctions.map((auction: Auction) => (
          <AuctionCard key={auction.id} auction={auction} variant={variant} />
        ))}
      </SimpleGrid>
    </>
  );
}

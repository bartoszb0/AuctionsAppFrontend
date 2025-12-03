import { Flex, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import type { Auction } from "../../types";
import AuctionCarousel from "./AuctionCarousel";

type AuctionDescriptionProps = {
  auction: Auction;
  highestBidAmount: string | null;
};

export default function AuctionDescription({
  auction,
  highestBidAmount,
}: AuctionDescriptionProps) {
  const deadlineFormatted = dayjs(auction?.deadline).format(
    "MMMM DD, YYYY h:mm A"
  );

  return (
    <>
      <Flex pl="xl" pr="xl" mt="xl" gap="lg">
        <AuctionCarousel images={auction.images} />

        <Stack gap="sm">
          <Text size="40px">{auction.name}</Text>
          <Flex>
            <Link to={`/search?category=${auction.category}`}>
              {auction.category[0].toUpperCase() + auction.category.slice(1)}
            </Link>
          </Flex>
          <Text>{auction.description}</Text>
          <Text>Starting Price: ${auction.starting_price}</Text>
          <Text>Minimal Bid: ${auction.minimal_bid}</Text>
          <Text size="xl">Current Highest Bid: ${highestBidAmount}</Text>
          <Text size="xl">Auction end: {deadlineFormatted}</Text>
        </Stack>
      </Flex>
    </>
  );
}

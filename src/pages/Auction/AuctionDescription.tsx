import { Flex, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import type { Auction } from "../../types/types";
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
      <Flex pl="xl" pr="xl" mt="xl" gap="xl">
        <AuctionCarousel images={auction.images} />

        <Stack gap="sm">
          <Text size="40px">{auction.name}</Text>
          <Flex>
            <Link to={`/user/${auction.author.id}`}>
              {auction.author.username}
            </Link>
          </Flex>
          <Flex>
            <Link to={`/search?category=${auction.category}`}>
              {auction.category[0].toUpperCase() + auction.category.slice(1)}
            </Link>
          </Flex>
          <Text>Starting Price: ${auction.starting_price}</Text>
          <Text>Minimal Bid: ${auction.minimal_bid}</Text>
          <Text component="span" size="xl">
            Current Highest Bid: <Text c="grape">${highestBidAmount}</Text>
          </Text>
          <Text component="span" size="xl">
            Auction end: <Text c="grape">{deadlineFormatted}</Text>
          </Text>
        </Stack>
      </Flex>
      <Group p="lg" bg="dark.5" mt="md" w={700}>
        <Text style={{ overflowWrap: "anywhere" }}>{auction.description}</Text>
      </Group>
    </>
  );
}

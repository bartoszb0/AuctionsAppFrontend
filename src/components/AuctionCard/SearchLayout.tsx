import { Box, Flex, Text } from "@mantine/core";
import type { AuctionCardLayoutProps } from "../../types";

export default function SearchLayout({
  auction,
  formatDate,
}: AuctionCardLayoutProps) {
  return (
    <Flex h="100%">
      <Box w={180} h="100%" mr="md" style={{ backgroundColor: "grey" }}></Box>

      <Flex direction="column" justify="space-between" w="100%">
        <Flex justify="space-between">
          <Text size="xl" style={{ overflow: "hidden" }}>
            {auction.name}
          </Text>
          <Text size="xl">${auction.highest_bid}</Text>
        </Flex>

        <Flex justify="right">
          <Text size="lg">{formatDate(auction.deadline)}</Text>
        </Flex>

        <Flex justify="left">
          <Text size="sm">Created on: {formatDate(auction.created_on)}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

import { Box, Flex, Text } from "@mantine/core";
import type { AuctionCardLayoutProps } from "../../types";

export default function DefaultLayout({
  auction,
  formatDate,
}: AuctionCardLayoutProps) {
  return (
    <>
      <Box h={180} w="100%" mb="xs" style={{ backgroundColor: "grey" }}></Box>

      <Flex justify="space-between" mt="5px">
        <Text size="lg" style={{ overflow: "hidden" }}>
          {auction.name}
        </Text>
        <Text size="lg">${auction.highest_bid}</Text>
      </Flex>

      <Flex justify="right">
        <Text size="sm">{formatDate(auction.deadline)}</Text>
      </Flex>
    </>
  );
}

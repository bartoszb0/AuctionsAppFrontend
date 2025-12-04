import { Box, Flex, Text } from "@mantine/core";
import type { AuctionCardLayoutProps } from "../../types";

export default function WideLayout({
  auction,
  formatDate,
}: AuctionCardLayoutProps) {
  return (
    <Flex>
      <Box
        w={300}
        mr="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={auction.images[0].image}
          style={{
            maxWidth: "100%",
            maxHeight: "120px",
            objectFit: "contain",
          }}
        />
      </Box>

      <Flex direction="column" w="100%">
        <Flex justify="space-between">
          <Text size="xl" style={{ overflow: "hidden" }}>
            {auction.name}
          </Text>
          <Text size="xl">${auction.highest_bid}</Text>
        </Flex>

        <Flex justify="space-between">
          <Text c="dark.2">{auction.author.username}</Text>
          <Text size="lg">{formatDate(auction.deadline)}</Text>
        </Flex>

        <Flex justify="space-between" mt="xl">
          <Text size="sm">Created on: {formatDate(auction.created_on)}</Text>
          {auction.closed && <Text c="red">CLOSED</Text>}
        </Flex>
      </Flex>
    </Flex>
  );
}

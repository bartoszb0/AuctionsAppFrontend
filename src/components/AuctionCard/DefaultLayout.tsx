import { Box, Flex, Text } from "@mantine/core";
import type { AuctionCardLayoutProps } from "../../types/types";

export default function DefaultLayout({
  auction,
  formatDate,
}: AuctionCardLayoutProps) {
  return (
    <>
      <Box
        w="100%"
        h={230}
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
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
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

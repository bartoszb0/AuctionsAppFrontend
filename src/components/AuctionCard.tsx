import { Card, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import type { Auction } from "../types";

type AuctionCardProps = {
  auction: Auction;
};

export default function AuctionCard({ auction }: AuctionCardProps) {
  const navigate = useNavigate();
  const deadlineFormatted = dayjs(auction.deadline).format("DD MMM h:mm A");
  const tempImg = (
    <div
      style={{ width: "auto", minHeight: "200px", backgroundColor: "grey" }}
    ></div>
  );

  return (
    <Card w="300" h="300" onClick={() => navigate(`/auctions/${auction.id}`)}>
      {tempImg}
      <Flex justify="space-between" mt="5px">
        <Text size="lg" style={{ overflow: "hidden" }}>
          {auction.name}
        </Text>
        <Text size="lg">${auction.highest_bid}</Text>
      </Flex>

      <Flex justify="right">
        <Text size="sm">{deadlineFormatted}</Text>
      </Flex>
    </Card>
  );
}

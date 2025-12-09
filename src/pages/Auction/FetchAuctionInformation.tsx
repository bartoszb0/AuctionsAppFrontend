import { Flex, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Auction } from "../../types/types";
import api from "../../utils/api";
import { isAuthenticated } from "../../utils/isAuthenticated";
import AuctionBidSection from "./AuctionBidSection";
import AuctionDescription from "./AuctionDescription";
import BidsHistory from "./BidsHistory";

type FetchAuctionProps = {
  auctionId: number;
};

export default function FetchAuctionInformation({
  auctionId,
}: FetchAuctionProps) {
  const auth = isAuthenticated();

  const { data: auction } = useSuspenseQuery<Auction>({
    queryKey: ["auction", auctionId],
    queryFn: () => api.get(`auctions/${auctionId}/`).then((res) => res.data),
  });

  return (
    <Flex justify="center" direction="column" align="center" gap="sm">
      <AuctionDescription
        auction={auction}
        highestBidAmount={auction.highest_bid}
      />

      {auction.closed ? (
        <Flex justify="center" mt="lg">
          <Text c="red" size="xl">
            AUCTION CLOSED
          </Text>
        </Flex>
      ) : (
        <AuctionBidSection auction={auction} auth={auth} />
      )}

      <hr style={{ margin: "30px", borderColor: "grey", width: "100%" }} />

      <BidsHistory auctionId={auction.id}></BidsHistory>
    </Flex>
  );
}

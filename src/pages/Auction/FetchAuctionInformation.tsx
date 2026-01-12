import { Flex, Text } from "@mantine/core";
import useFetchAuction from "../../hooks/queries/useFetchAuction";
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

  const { data: auction } = useFetchAuction(auctionId);

  return (
    <Flex justify="center" direction="column" align="center" gap="sm">
      <AuctionDescription
        auction={auction}
        highestBidAmount={auction.highest_bid}
      />

      {auction.closed ? (
        <Flex justify="center" mt="lg">
          <Text c="red.8" fs="italic" size="xl">
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

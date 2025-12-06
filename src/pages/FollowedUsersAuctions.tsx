import { Flex, Text } from "@mantine/core";
import DataContentWrapper from "../components/DataContentWrapper";
import FetchAuctionsPagination from "../components/FetchAuctionsPagination";

export default function FollowedUsersAuction() {
  return (
    <>
      <Flex align="center" justify="center" mt="xl" direction="column" mb="xl">
        <Text size="30px" fw={700}>
          Followed user's auction
        </Text>
      </Flex>
      <DataContentWrapper>
        <FetchAuctionsPagination
          endpoint={"auctions/followed/"}
          variant="wide"
          baseQueryKey="followed-auctions"
        />
      </DataContentWrapper>
    </>
  );
}

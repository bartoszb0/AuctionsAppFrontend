import { Button, Flex, Stack, Table, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import useBidsHistory from "../../hooks/queries/useBidsHistory";
import type { Bid } from "../../types/types";

type BidsHistoryProps = {
  auctionId: number;
};

export default function BidsHistory({ auctionId }: BidsHistoryProps) {
  const {
    data: bidsHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBidsHistory(auctionId);

  const allBids: Bid[] = bidsHistory.pages.flatMap((page) => page.results);

  const bidsElement = allBids.map((bid) => {
    const formattedDate = dayjs(bid.placed_on).format("HH:mm:ss | DD-MM-YYYY");

    return (
      <Table.Tr key={bid.id}>
        <Table.Td>
          <Link to={`/user/${bid.bidder.id}`}>{bid.bidder.username}</Link>
        </Table.Td>
        <Table.Td>${bid.amount}</Table.Td>
        <Table.Td>{formattedDate}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      {allBids.length === 0 ? (
        <Flex align="center" justify="center">
          <Text mb="md" fs="italic" size="xl">
            No bids found
          </Text>
        </Flex>
      ) : (
        <Stack align="center" mb="xl">
          <Text mb="md" size="xl">
            Bids History
          </Text>

          <Table w={700} striped highlightOnHover captionSide="top">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Bidder</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Placed on</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{bidsElement}</Table.Tbody>
          </Table>

          {hasNextPage && (
            <Button
              variant="default"
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              Show more bids
            </Button>
          )}
        </Stack>
      )}
    </>
  );
}

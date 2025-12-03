import { Button, Flex, Loader, Stack, Table, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Bid } from "../../types";
import api from "../../utils/api";

type BidsHistoryProps = {
  auctionId: number;
  bidsHistory: Bid[] | null;
  setBidsHistory: React.Dispatch<React.SetStateAction<Bid[]>>;
};

export default function BidsHistory({
  auctionId,
  bidsHistory,
  setBidsHistory,
}: BidsHistoryProps) {
  const [moreBidsAvailable, setMoreBidsAvailable] = useState<string | null>(
    null
  );
  const [loadingBids, setLoadingBids] = useState(true);
  const [loadingMoreBids, setLoadingMoreBids] = useState(false);

  async function fetchBids(fetchMoreUrl?: string) {
    if (fetchMoreUrl) setLoadingMoreBids(true);

    try {
      const response = await api.get(
        fetchMoreUrl || `auctions/${auctionId}/bids/`
      );
      if (!fetchMoreUrl) {
        setBidsHistory(response.data.results);
      } else {
        setBidsHistory((prev) => {
          const newUniqueBids = response.data.results.filter(
            (bid: Bid) => !prev.some((existing) => existing.id === bid.id)
          );

          return [...prev, ...newUniqueBids];
        });
      }

      if (!response.data.next) {
        setMoreBidsAvailable(null);
      } else {
        setMoreBidsAvailable(response.data.next);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoadingBids(false);
      setLoadingMoreBids(false);
    }
  }

  useEffect(() => {
    fetchBids();
  }, [auctionId]);

  const bidsElement = bidsHistory?.map((bid) => {
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
      {loadingBids ? (
        <Flex align="center" justify="center" mt="xl">
          <Loader />
        </Flex>
      ) : !bidsElement || bidsElement.length === 0 ? (
        <Flex align="center" justify="center">
          <Text mb="md" size="xl">
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

          {moreBidsAvailable &&
            (loadingMoreBids ? (
              <Loader />
            ) : (
              <Button
                variant="default"
                onClick={() => fetchBids(moreBidsAvailable)}
              >
                Show more bids
              </Button>
            ))}
        </Stack>
      )}
    </>
  );
}

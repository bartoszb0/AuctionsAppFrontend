import { Button, Loader, Stack, Table, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Bid } from "../../types";
import api from "../../utils/api";

type BidsHistoryProps = {
  auctionId: number;
};

export default function BidsHistory({ auctionId }: BidsHistoryProps) {
  const [bidsHistory, setBidsHistory] = useState<Bid[] | null>(null);
  const [moreBidsAvailable, setMoreBidsAvailable] = useState<string | null>(
    null
  );
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
        setBidsHistory((prev) => [...(prev ?? []), ...response.data.results]);
      }

      if (!response.data.next) {
        setMoreBidsAvailable(null);
      } else {
        setMoreBidsAvailable(response.data.next);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
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
      {bidsElement && bidsElement.length > 0 ? (
        <>
          <Stack align="center" mb="xl">
            <Text mb="md" size="xl">
              Bids History
            </Text>

            <Table
              w={800}
              align="center"
              striped
              highlightOnHover
              captionSide="top"
            >
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
        </>
      ) : (
        <Text style={{ textAlign: "center" }} mb="md" size="xl">
          No bids found
        </Text>
      )}
    </>
  );
}

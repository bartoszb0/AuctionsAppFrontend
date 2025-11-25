import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Group,
  Loader,
  NumberInput,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";
import Header from "../components/Header";
import type { Auction } from "../types";
import api from "../utils/api";

export default function Auction() {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await api.get(`auctions/${auctionId}`);
        setAuction(response.data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      }
    };

    fetchAuction();
  }, [auctionId]);

  const deadlineFormatted = dayjs(auction?.deadline).format(
    "MMMM DD, YYYY h:mm A"
  );

  const tempImg = (
    <div
      style={{ width: "300px", minHeight: "300px", backgroundColor: "grey" }}
    ></div>
  );

  const x = 50;

  /// TODO - when sending bid patch to backend and it refuses bcuz higher bid
  /// is bigger rn than the one send, automatically reload the page to get current highest value (?)
  /// idk if its going to work bcuz i want to use websockets

  const schema = z.object({
    bid: z.number("Number required").min(30, `Bid must be at least ${x}`),
  });

  type FormFields = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header auth={false} />
      {!auction ? (
        <Flex align="center" justify="center" mt="xl">
          <Loader />
        </Flex>
      ) : (
        <>
          <Flex pl="xl" pr="xl" mt="xl" gap="lg">
            <Group>{tempImg}</Group>
            <Stack gap="sm">
              <Text size="40px">{auction.name}</Text>
              <Flex>
                <Link to={`/search?category=${auction.category}`}>
                  {auction.category[0].toUpperCase() +
                    auction.category.slice(1)}
                </Link>
              </Flex>
              <Text>{auction.description}</Text>
              <Text>Starting Price: ${auction.starting_price}</Text>
              <Text>Minimal Bid: ${auction.minimal_bid}</Text>
              <Text size="xl">Current Highest Bid: ${auction.highest_bid}</Text>
              <Text size="xl">Auction end: {deadlineFormatted}</Text>
            </Stack>
          </Flex>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex justify="center" mt="lg" gap="sm">
              <Controller
                name="bid"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    disabled={isSubmitting}
                    placeholder="e.g. 100"
                    size="xl"
                    error={errors.bid && errors.bid.message}
                    min={0}
                  />
                )}
              />
              {isSubmitting ? (
                <Flex align="center">
                  <Loader />
                </Flex>
              ) : (
                <Button type="submit" size="xl">
                  Place Bid
                </Button>
              )}
            </Flex>
          </form>

          <hr style={{ margin: "30px", borderColor: "grey" }} />
          <Stack>
            <Flex justify="center">
              <Text>Bids History</Text>
            </Flex>
            <Table></Table>
          </Stack>
        </>
      )}
    </>
  );
}

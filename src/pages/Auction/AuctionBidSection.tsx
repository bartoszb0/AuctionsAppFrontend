import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Loader, NumberInput } from "@mantine/core";
import { Decimal } from "decimal.js";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import type { Auction, Bid } from "../../types";
import api from "../../utils/api";

type AuctionBidSectionProps = {
  auction: Auction;
  setBidsHistory: React.Dispatch<React.SetStateAction<Bid[]>>;
  setHighestBidAmount: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function AuctionBidSection({
  auction,
  setBidsHistory,
  setHighestBidAmount,
}: AuctionBidSectionProps) {
  const highestBidAmount = new Decimal(auction.highest_bid); // musze to zmienic na reaktywne
  const minimalBidAmount = new Decimal(auction.minimal_bid); // to tez

  const [currentMinimalBidAmount, setCurrentMinimalBidAmount] = useState(
    highestBidAmount.plus(minimalBidAmount)
  );

  const schema = z.object({
    amount: z
      .number("Number required")
      .min(
        currentMinimalBidAmount.toNumber(),
        `Bid must be at least $${currentMinimalBidAmount.toFixed(2)}`
      ),
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
      const response = await api.post(`auctions/${auction.id}/bids/`, data);
      const newBid = response.data;
      // Set highest bid amount for display
      setHighestBidAmount(newBid.amount);
      // Set highest bid amount for validation
      const newHighestBidAmount = new Decimal(newBid.amount);
      setCurrentMinimalBidAmount(newHighestBidAmount.plus(minimalBidAmount));
      // Add bid to bids history
      setBidsHistory((prev) => [newBid, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center" mt="lg" gap="sm">
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              disabled={isSubmitting}
              placeholder="e.g. 100"
              size="xl"
              error={errors.amount && errors.amount.message}
              min={0}
              decimalScale={2}
              prefix="$"
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
  );
}

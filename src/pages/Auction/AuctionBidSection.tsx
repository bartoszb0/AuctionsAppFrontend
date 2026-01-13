import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Loader, NumberInput } from "@mantine/core";
import { Decimal } from "decimal.js";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import usePlaceBid from "../../hooks/mutations/usePlaceBid";
import { bidSchema, type BidFormFields } from "../../schemas/bidSchema";
import type { Auction, AuthStatus } from "../../types/types";

type AuctionBidSectionProps = {
  auction: Auction;
  auth: AuthStatus;
};

export default function AuctionBidSection({
  auction,
  auth,
}: AuctionBidSectionProps) {
  const highestBidAmount = new Decimal(auction.highest_bid);
  const minimalBidAmount = new Decimal(auction.minimal_bid);
  const currentMinimalBidAmount = highestBidAmount.plus(minimalBidAmount);

  const schema = bidSchema(currentMinimalBidAmount.toNumber());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BidFormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = usePlaceBid(auction.id);

  const onSubmit: SubmitHandler<BidFormFields> = async (data) => {
    mutate(data);
  };

  return (
    <>
      {auth.isAuthenticated && auth.userId !== auction.author.id && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex justify="center" mt="lg" gap="sm">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  disabled={isPending}
                  placeholder="e.g. 100"
                  size="xl"
                  error={errors.amount && errors.amount.message}
                  min={0}
                  decimalScale={2}
                  prefix="$"
                />
              )}
            />
            {isPending ? (
              <Flex align="center">
                <Loader />
              </Flex>
            ) : (
              <Button type="submit" size="xl" disabled={isPending}>
                Place Bid
              </Button>
            )}
          </Flex>
        </form>
      )}
    </>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Loader, NumberInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Decimal } from "decimal.js";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import type { Auction, AuthStatus } from "../../types/types";
import api from "../../utils/api";

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

  const schema = z.object({
    amount: z
      .number("Number required")
      .min(
        currentMinimalBidAmount.toNumber(),
        `Bid must be at least $${currentMinimalBidAmount.toFixed(2)}`
      ),
  });

  type FormFields = z.infer<typeof schema>;

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormFields) =>
      api.post(`auctions/${auction.id}/bids/`, data),

    onError: (error) => toast.error(error.message),

    onSuccess: () => toast.success("Bid placed succesfully"),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bids-history", auction.id] });
      queryClient.invalidateQueries({ queryKey: ["auction", auction.id] });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    mutate(data);
  };

  return (
    <>
      {auth.isAuthenticated && Number(auth.userId) !== auction.author.id && (
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

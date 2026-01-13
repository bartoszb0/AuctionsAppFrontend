import { z } from "zod";

export const bidSchema = (minAmount: number) =>
  z.object({
    amount: z
      .number("Number required")
      .min(minAmount, `Bid must be at least $${minAmount.toFixed(2)}`),
  });

export type BidFormFields = z.infer<ReturnType<typeof bidSchema>>;

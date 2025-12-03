import { Card } from "@mantine/core";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import type { Auction } from "../../types";
import DefaultLayout from "./DefaultLayout";
import SearchLayout from "./SearchLayout";

type AuctionCardProps = {
  auction: Auction;
  variant?: "default" | "wide";
};

export default function AuctionCard({
  auction,
  variant = "default",
}: AuctionCardProps) {
  function formatDate(date: string) {
    return dayjs(date).format("DD MMM h:mm A");
  }

  return (
    <Card
      component={Link}
      to={`/auctions/${auction.id}`}
      h={variant === "wide" ? 150 : 300}
      w={variant === "wide" ? "100%" : 300}
      style={{ cursor: "pointer" }}
    >
      {variant === "wide" ? (
        <SearchLayout auction={auction} formatDate={formatDate} />
      ) : (
        <DefaultLayout auction={auction} formatDate={formatDate} />
      )}
    </Card>
  );
}

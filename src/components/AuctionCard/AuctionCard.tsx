import { Card } from "@mantine/core";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import type { Auction } from "../../types";
import DefaultLayout from "./DefaultLayout";
import SearchLayout from "./SearchLayout";

type AuctionCardProps = {
  auction: Auction;
  variant?: "default" | "search";
};

export default function AuctionCard({
  auction,
  variant = "default",
}: AuctionCardProps) {
  const navigate = useNavigate();

  function navigateToAuction() {
    navigate(`/auctions/${auction.id}`);
  }

  function formatDate(date: string) {
    return dayjs(date).format("DD MMM h:mm A");
  }

  return (
    <Card
      onClick={navigateToAuction}
      h={variant === "search" ? 150 : 300}
      w={variant === "search" ? "90%" : 300}
      style={{ cursor: "pointer" }}
    >
      {variant === "search" ? (
        <SearchLayout auction={auction} formatDate={formatDate} />
      ) : (
        <DefaultLayout auction={auction} formatDate={formatDate} />
      )}
    </Card>
  );
}

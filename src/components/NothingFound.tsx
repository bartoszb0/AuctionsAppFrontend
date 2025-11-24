import type { Auction } from "../types";

type NothingFoundProps = {
  isLoading: boolean;
  auctionArray: Auction[];
};

export default function NothingFound({
  isLoading,
  auctionArray,
}: NothingFoundProps) {
  return (
    <>{!isLoading && auctionArray.length <= 0 && <h1>Nothing found</h1>}</>
  );
}

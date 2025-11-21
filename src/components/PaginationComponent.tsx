import { Pagination } from "@mantine/core";
import { AUCTIONS_PER_PAGE } from "../constants/constants";

type PaginationProps = {
  currentPage: number;
  allAuctionsCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function PaginationComponent({
  currentPage,
  allAuctionsCount,
  setCurrentPage,
}: PaginationProps) {
  return (
    <Pagination
      m="xl"
      size="xl"
      value={currentPage}
      total={Math.ceil(allAuctionsCount / AUCTIONS_PER_PAGE)}
      onChange={setCurrentPage}
    />
  );
}

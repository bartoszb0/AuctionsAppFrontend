import { Pagination } from "@mantine/core";
import type { SetURLSearchParams } from "react-router-dom";
import { AUCTIONS_PER_PAGE } from "../constants/constants";

type PaginationProps = {
  currentPage: number;
  allAuctionsCount: number;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export default function PaginationComponent({
  currentPage,
  allAuctionsCount,
  searchParams,
  setSearchParams,
}: PaginationProps) {
  return (
    <Pagination
      m="xl"
      size="xl"
      value={currentPage}
      total={Math.ceil(allAuctionsCount / AUCTIONS_PER_PAGE)}
      onChange={(newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        setSearchParams(params);
      }}
    />
  );
}

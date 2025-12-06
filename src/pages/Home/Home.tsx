import { Flex } from "@mantine/core";
import Categories from "../../components/Categories";
import DataContentWrapper from "../../components/DataContentWrapper";
import FetchAuctionsPagination from "../../components/FetchAuctionsPagination";
import SearchInput from "../../components/SearchInput";

export default function Home() {
  return (
    <>
      <Flex justify="center" direction="column" align="center" gap="sm">
        <SearchInput />
        <Categories />
        <DataContentWrapper>
          <FetchAuctionsPagination
            endpoint={"auctions/"}
            baseQueryKey="homepage-auctions"
          />
        </DataContentWrapper>
      </Flex>
    </>
  );
}

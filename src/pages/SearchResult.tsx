import { Flex } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import SearchInput from "../components/SearchInput";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("query");

  return (
    <Flex>
      <SearchInput />
      {search || "nothing"}
    </Flex>
  );
}

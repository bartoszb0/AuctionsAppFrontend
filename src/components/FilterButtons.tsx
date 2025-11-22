import {
  Button,
  Checkbox,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
} from "@mantine/core";
import { Link, type SetURLSearchParams } from "react-router-dom";
import { categories } from "../categories";

type FilterButtonsProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  currentSize: number;
  currentOrdering: string;
};

export default function FilterButtons({
  searchParams,
  setSearchParams,
  currentSize,
  currentOrdering,
}: FilterButtonsProps) {
  function setParamsOnChange(value: string | null, paramName: string) {
    if (value === null) return;
    const params = new URLSearchParams(searchParams);
    params.set(paramName, value.toString());
    params.set("page", "1");
    setSearchParams(params);
  }

  return (
    <Flex gap="xl">
      <Stack>
        <Group>
          Categories
          <ul>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/search?category=${category.name}`}
              >
                {category.name[0].toUpperCase() + category.name.slice(1)}
              </Link>
            ))}
          </ul>
        </Group>

        <Group>
          Highest bid
          <Flex>
            <NumberInput placeholder="From" />
            <NumberInput placeholder="To" />
          </Flex>
        </Group>

        <Checkbox label="Show finished auctions" size="md" />

        <Button>Save filters</Button>
      </Stack>
      <Stack>
        <Select
          label="Sort"
          checkIconPosition="right"
          value={currentOrdering}
          data={[
            { value: "-created_on", label: "Creation Date - Newest First" },
            { value: "created_on", label: "Creation Date - Oldest First" },
            { value: "highest_bid", label: "Highest Bid - Low to High" },
            { value: "-highest_bid", label: "Highest Bid - High to Low" },
            { value: "deadline", label: "Deadline - Ending Soonest" },
            { value: "-deadline", label: "Deadline - Ending Latest" },
          ]}
          allowDeselect={false}
          onChange={(value) => setParamsOnChange(value, "ordering")}
        />
        <Select
          label="Auctions per page"
          checkIconPosition="right"
          value={currentSize.toString()}
          data={["5", "10", "15", "20"]}
          allowDeselect={false}
          onChange={(value) => setParamsOnChange(value, "size")}
        />
      </Stack>
    </Flex>
  );
}

import {
  Button,
  Checkbox,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { Link, type SetURLSearchParams } from "react-router-dom";
import { categories } from "../constants/categories";

type FilterButtonsProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  currentSize: number;
  currentOrdering: string;
  currentFinishedAuctions: boolean;
  currentMinBid: string | number;
  currentMaxBid: string | number;
};

type FilterFormValues = {
  minBid?: number;
  maxBid?: number;
};

export default function FilterButtons({
  searchParams,
  setSearchParams,
  currentSize,
  currentOrdering,
  currentFinishedAuctions,
  currentMinBid,
  currentMaxBid,
}: FilterButtonsProps) {
  function setParamsOnChange(
    value: string | null | boolean,
    paramName: string
  ) {
    const params = new URLSearchParams(searchParams);

    if (value === null || value === "" || value === false) {
      params.delete(paramName);
    } else {
      params.set(paramName, String(value));
    }

    params.set("page", "1");
    setSearchParams(params);
  }

  const defaultMinBid = currentMinBid ? Number(currentMinBid) : undefined;
  const defaultMaxBid = currentMaxBid ? Number(currentMaxBid) : undefined;

  const { control, handleSubmit } = useForm<FilterFormValues>({
    defaultValues: {
      minBid: defaultMinBid,
      maxBid: defaultMaxBid,
    },
  });

  function onSubmit(data: FilterFormValues) {
    const minBid = data.minBid;
    const maxBid = data.maxBid;

    const params = new URLSearchParams(searchParams);

    if (minBid === null || minBid === undefined) {
      params.delete("min_bid");
    } else {
      params.set("min_bid", String(minBid));
    }

    if (maxBid === null || maxBid === undefined) {
      params.delete("max_bid");
    } else {
      params.set("max_bid", String(maxBid));
    }

    params.set("page", "1");
    setSearchParams(params);
  }

  return (
    <Flex gap="lg" justify="center" align="center" bg="dark.6" p="sm" bdrs="md">
      <Stack>
        <Group>
          Categories
          <Flex gap="sm">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/search?category=${category.name}`}
              >
                {category.name[0].toUpperCase() + category.name.slice(1)}
              </Link>
            ))}
          </Flex>
        </Group>

        <Group>
          Highest bid
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex gap="sm">
              <Controller
                name="minBid"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    placeholder="From"
                    decimalScale={2}
                    hideControls
                    prefix="$"
                    w={100}
                  />
                )}
              />

              <Controller
                name="maxBid"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    placeholder="To"
                    decimalScale={2}
                    hideControls
                    prefix="$"
                    w={100}
                  />
                )}
              />
              <Button type="submit" w={70}>
                Filter
              </Button>
            </Flex>
          </form>
        </Group>

        <Checkbox
          label="Show finished auctions"
          size="md"
          checked={currentFinishedAuctions}
          onChange={(event) =>
            setParamsOnChange(event.currentTarget.checked, "closed")
          }
        />
      </Stack>
      <Stack>
        <Select
          label="Sort by"
          checkIconPosition="right"
          value={currentOrdering}
          data={[
            { value: "-created_on", label: "Creation Date - Newest First" },
            { value: "created_on", label: "Creation Date - Oldest First" },
            { value: "highest_bid_amount", label: "Highest Bid - Low to High" },
            {
              value: "-highest_bid_amount",
              label: "Highest Bid - High to Low",
            },
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

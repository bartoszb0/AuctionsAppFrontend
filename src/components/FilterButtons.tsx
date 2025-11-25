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
import { categories } from "../categories";

type FilterButtonsProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  currentSize: number;
  currentOrdering: string;
  currentFinishedAuctions: boolean;
  currentMinBid: string | number;
  currentMaxBid: string | number;
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
    console.log(value);

    if (value === null || value === "" || value === false) {
      params.delete(paramName);
    } else {
      params.set(paramName, String(value));
    }

    params.set("page", "1");
    setSearchParams(params);
  }

  const { control, handleSubmit } = useForm<any>({});

  function onSubmit(data: any) {
    const minBid = data.minBid;
    const maxBid = data.maxBid;
    console.log(minBid);

    const params = new URLSearchParams(searchParams);

    if (
      minBid === null ||
      minBid === "" ||
      minBid === false ||
      minBid === undefined
    ) {
      params.delete("min_bid");
    } else {
      params.set("min_bid", String(minBid));
    }

    if (
      maxBid === null ||
      maxBid === "" ||
      maxBid === false ||
      maxBid === undefined
    ) {
      params.delete("max_bid");
    } else {
      params.set("max_bid", String(maxBid));
    }

    params.set("page", "1");
    setSearchParams(params);
  }

  return (
    <Flex gap="lg" justify="center" align="center">
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
          <Flex gap="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="minBid"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    placeholder="From"
                    value={currentMinBid}
                    decimalScale={2}
                    hideControls
                    prefix="$"
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
                    value={currentMaxBid}
                    decimalScale={2}
                    hideControls
                    prefix="$"
                  />
                )}
              />
              <Button type="submit">Filter</Button>
            </form>
          </Flex>
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

import {
  Autocomplete,
  Button,
  Checkbox,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
} from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../categories";
import { PREVIOUS_SEARCHES_LIMIT } from "../constants/constants";

type FormFields = {
  query: string;
};

type SearchInputProps = {
  displayFilterButtons?: boolean;
  searchParams?: URLSearchParams;
};

export default function SearchInput({
  displayFilterButtons,
  searchParams,
}: SearchInputProps) {
  const navigate = useNavigate();
  const [previousSearches, setPreviousSearches] = useState<string[]>(() => {
    const stored = localStorage.getItem("previousSearches");
    return stored ? JSON.parse(stored) : [];
  });

  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      query: searchParams?.get("search") || "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = ({ query }) => {
    if (!query) return;
    const searchQuery = query.trim();

    navigate(`/search?search=${searchQuery}`);

    setPreviousSearches((prev) => {
      const updatedSearches = [
        searchQuery,
        ...prev.filter((q) => q !== searchQuery),
      ].slice(0, PREVIOUS_SEARCHES_LIMIT);
      localStorage.setItem("previousSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="query"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            size="xl"
            placeholder="Search for auction..."
            radius="xl"
            mt="xl"
            w="500"
            data={previousSearches}
            limit={PREVIOUS_SEARCHES_LIMIT}
            rightSectionWidth="md"
            rightSection={
              <Button type="submit" radius="xl" mr="md">
                <SearchIcon />
              </Button>
            }
          />
        )}
      />
      {displayFilterButtons && (
        <>
          <Flex gap="xl">
            <Stack>
              <Group>
                Categories
                <ul>
                  {categories.map((category) => (
                    <Link to={`/search?category=${category.name}`}>
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
                defaultValue="Creation Date - Newest First"
                data={[
                  "Creation Date - Newest First",
                  "Creation Date - Oldest First",
                  "Highest Bid - Low to High",
                  "Highest Bid - High to Low",
                  "Deadline - Ending Soonest",
                  "Deadline - Ending Latest",
                ]}
              />
              <Select
                label="Auctions per page"
                placeholder="add here default value after adding pagination"
                data={["5", "10", "15", "20"]}
              />
            </Stack>
          </Flex>
        </>
      )}
    </form>
  );
}

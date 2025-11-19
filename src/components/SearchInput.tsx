import { Autocomplete, Button } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PREVIOUS_SEARCHES_LIMIT } from "../constants/constants";
import FilterButtons from "./FilterButtons";

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
      {displayFilterButtons && <FilterButtons />}
    </form>
  );
}

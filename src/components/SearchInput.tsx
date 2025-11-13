import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@mantine/core";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function SearchInput() {
  const navigate = useNavigate();

  const schema = z.object({
    query: z.string(),
  });

  type FormFields = z.infer<typeof schema>;

  const { register, handleSubmit } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = ({ query }) => {
    const searchQuery = query.trim();
    if (!searchQuery) return;

    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        size="xl"
        placeholder="Search for auction..."
        radius="xl"
        mt="xl"
        w="500"
        {...register("query")}
        rightSectionWidth="md"
        rightSection={
          <Button type="submit" radius="xl" mr="md">
            <SearchIcon />
          </Button>
        }
      ></TextInput>
    </form>
  );
}

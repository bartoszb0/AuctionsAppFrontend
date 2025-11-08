import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Loader,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { categories } from "../../categories";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be at most 500 characters long"),
  startingPrice: z
    .number("Number required")
    .min(0.01, "Starting price must be at least 0.01"),
  minimalBid: z
    .number("Number required")
    .min(0.01, "Minimal bid must be at least 0.01"),
  category: z.enum(categories, { message: "Category is required" }),
  deadline: z.string(),
});

type FormFields = z.infer<typeof schema>;

// TODO displaying error on root

export default function NewAuction() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <>
      <Stack mb="lg" m="lg" pl="xl" pr="xl">
        <Title>Create new Auction</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register("name")}
            error={errors.name && errors.name.message}
            size="lg"
            label="Item Name"
            placeholder="e.g., Mousepad"
          />
          <Textarea
            {...register("description")}
            error={errors.description && errors.description.message}
            size="lg"
            label="Description"
            placeholder="e.g., A brand new mousepad"
            mt="md"
            autosize
            maxRows={4}
          ></Textarea>
          <Controller
            name="startingPrice"
            control={control}
            render={({ field }) => (
              <NumberInput
                {...field}
                error={errors.startingPrice && errors.startingPrice.message}
                size="lg"
                label="Starting Price"
                placeholder="e.g., 10.00"
                mt="md"
                min={0}
                decimalScale={2}
              />
            )}
          />
          <Controller
            name="minimalBid"
            control={control}
            render={({ field }) => (
              <NumberInput
                {...field}
                error={errors.minimalBid && errors.minimalBid.message}
                size="lg"
                label="Minimal Bid"
                placeholder="e.g., 5.00"
                mt="md"
                min={0}
                decimalScale={2}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                error={errors.category && errors.category.message}
                size="lg"
                label="Category"
                placeholder="Select category"
                mt="md"
                data={categories.map((category) => ({
                  value: category,
                  label: category.charAt(0).toUpperCase() + category.slice(1),
                }))}
              />
            )}
          />
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                error={errors.deadline && errors.deadline.message}
                size="lg"
                label="Auction deadline"
                placeholder="Pick date and time"
                mt="md"
              />
            )}
          />
          <Flex justify="center" mt="md">
            {isSubmitting ? (
              <Loader mt="md" type="bars" />
            ) : (
              <Button size="lg" mt="md" type="submit">
                Create Auction
              </Button>
            )}
          </Flex>
        </form>
      </Stack>
    </>
  );
}

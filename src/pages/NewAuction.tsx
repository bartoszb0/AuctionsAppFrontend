import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Flex,
  Loader,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { categories } from "../categories";
import ImageDropzone from "../components/ImageDropzone";
import api from "../utils/api";
import displayError from "../utils/displayError";

let minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
minDate.setHours(0, 0, 0, 0);

const validChoices = categories.map((category) => category.name);

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
    .min(0.01, "Starting price must be at least 0.01")
    .max(9999999.99, "Starting price must be at most 9,999,999.99"),
  minimalBid: z
    .number("Number required")
    .min(0.01, "Minimal bid must be at least 0.01")
    .max(9999999.99, "Minimal bid must be at most 9,999,999.99"),
  category: z.enum(validChoices, { message: "Category is required" }),
  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((deadline) => new Date(deadline) >= minDate, {
      message: "Deadline must be at least next day",
      path: ["deadline"],
    }),
  files: z
    .array(z.instanceof(File))
    .min(1, "At least one photo is required")
    .max(10, "Maximum 10 files allowed"),
});
type FormFields = z.infer<typeof schema>;

export default function NewAuction() {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      deadline: "",
      files: [],
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("starting_price", data.startingPrice.toString());
      formData.append("minimal_bid", data.minimalBid.toString());
      formData.append("category", data.category);
      formData.append("deadline", data.deadline);

      data.files.forEach((file) => {
        formData.append("uploaded_images", file);
      });

      const response = await api.post("auctions/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate(`/auctions/${response.data.id}/`, { replace: true });
      toast.success("Auction created successfully!");
    } catch (err) {
      setError("root", { message: displayError(err) });
    }
  };

  return (
    <>
      <Stack mb="lg" m="lg" pl="xl" pr="xl" maw={700} mx="auto">
        <Title style={{ textAlign: "center" }}>Create new Auction</Title>
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
                max={9999999.99}
                decimalScale={2}
                prefix="$"
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
                max={9999999.99}
                decimalScale={2}
                prefix="$"
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
                  value: category.name,
                  label:
                    category.name.charAt(0).toUpperCase() +
                    category.name.slice(1),
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
                minDate={minDate}
                size="lg"
                label="Auction deadline"
                placeholder="Pick date and time"
                mt="md"
              />
            )}
          />

          <Controller
            name="files"
            control={control}
            render={({ field }) => (
              <ImageDropzone
                files={field.value}
                setFiles={field.onChange}
                errors={errors}
              />
            )}
          />

          {errors.root && (
            <Text size="lg" mt="md" c="red.8">
              {errors.root.message}
            </Text>
          )}

          <Flex justify="center" mt="md">
            {isSubmitting ? (
              <Loader mt="md" />
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

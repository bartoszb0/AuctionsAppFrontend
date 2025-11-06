import {
  Button,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function NewAuction() {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      startingPrice: "",
      minimalBid: "",
      category: "",
      deadline: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      description: Yup.string()
        .max(500, "Must be 500 characters or less")
        .required("Required"),
      startingPrice: Yup.number()
        .transform((value, originalValue) =>
          originalValue === "" || isNaN(value) ? undefined : value
        )
        .positive("Must be positive")
        .required("Required"),
      minimalBid: Yup.number()
        .transform((value, originalValue) =>
          originalValue === "" || isNaN(value) ? undefined : value
        )
        .positive("Must be positive")
        .required("Required"),
      category: Yup.string().required("Required"),
      deadline: Yup.date()
        .min(new Date(), "Must be in the future")
        .required("Required"),
    }),
  });

  return (
    <>
      <Stack mb="lg" m="lg" pl="xl" pr="xl">
        <Title>Create new Auction</Title>
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            size="lg"
            label="Item Name"
            placeholder="e.g., Mousepad"
          />
          <Textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
            size="lg"
            label="Description"
            placeholder="e.g., A brand new mousepad"
            mt="md"
            autosize
            maxRows={4}
          ></Textarea>
          <NumberInput
            name="startingPrice"
            value={formik.values.startingPrice}
            onChange={(value) => formik.setFieldValue("startingPrice", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.startingPrice && formik.errors.startingPrice}
            size="lg"
            label="Starting Price"
            placeholder="e.g., 10.00"
            mt="md"
            min={0.01}
            decimalScale={2}
          />
          <NumberInput
            name="minimalBid"
            value={formik.values.minimalBid}
            onChange={(value) => formik.setFieldValue("minimalBid", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.minimalBid && formik.errors.minimalBid}
            size="lg"
            label="Minimal Bid"
            placeholder="e.g., 5.00"
            mt="md"
            min={0.01}
            decimalScale={2}
          />
          <Select
            name="category"
            value={formik.values.category}
            onChange={(value) => formik.setFieldValue("category", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.category && formik.errors.category}
            size="lg"
            label="Category"
            placeholder="Select category"
            mt="md"
            data={[
              { value: "home", label: "Home" },
              { value: "music", label: "Music" },
              { value: "sports", label: "Sports" },
              { value: "electronics", label: "Electronics" },
              { value: "fashion", label: "Fashion" },
              { value: "other", label: "Other" },
            ]}
          />
          <DateTimePicker
            name="deadline"
            value={formik.values.deadline}
            onChange={(value) => formik.setFieldValue("deadline", value)}
            onBlur={formik.handleBlur}
            error={formik.touched.deadline && formik.errors.deadline}
            minDate={dayjs().add(1, "day").toDate()}
            size="lg"
            label="Auction deadline"
            placeholder="Pick date and time"
            mt="md"
          />
          <Button size="lg" mt="md" type="submit">
            Create Auction
          </Button>
        </form>
      </Stack>
    </>
  );
}

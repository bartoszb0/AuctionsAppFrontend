import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import api from "../../utils/api";
import displayError from "../../utils/displayError";

export default function NewAuction() {
  async function createNewAuction(formData: any) {
    const name = formData.get("name");
    const description = formData.get("description");
    const startingPrice = formData.get("startingPrice");
    const minimalBid = formData.get("minimalBid");
    const category = formData.get("category");
    const deadline = formData.get("deadline");

    const date = new Date(deadline);
    const isoString = date.toISOString().slice(0, 19);

    try {
      await api.post("auctions/", {
        name: name,
        description: description,
        starting_price: startingPrice,
        minimal_bid: minimalBid,
        category: category,
        deadline: isoString,
      });
    } catch (err) {
      console.log(err);
      displayError(err);
    }
  }

  return (
    <>
      <Box
        component="form"
        action={createNewAuction}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 700,
          mx: "auto",
          mt: 5,
          gap: 2,
        }}
      >
        <Typography variant="h4" color="inherit">
          Create new Auction
        </Typography>
        <TextField label="Name" name="name" required />

        <TextField
          label="Description"
          name="description"
          multiline
          rows={6}
          required
        />

        <TextField
          label="Starting Price"
          name="startingPrice"
          type="number"
          slotProps={{
            input: {
              inputProps: {
                min: 0.01,
                max: 999999999,
                step: 0.01,
              },
            },
          }}
          required
        />

        <TextField
          label="Minimal bid"
          name="minimalBid"
          type="number"
          slotProps={{
            input: {
              inputProps: {
                min: 0.01,
                max: 999999999,
                step: 0.01,
              },
            },
          }}
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label="Deadline" name="deadline" />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select label="Category" name="category" defaultValue="" required>
            <MenuItem value={"home"}>Home</MenuItem>
            <MenuItem value={"sports"}>Sports</MenuItem>
            <MenuItem value={"music"}>Music</MenuItem>
            <MenuItem value={"electronics"}>Electronics</MenuItem>
            <MenuItem value={"clothing"}>Clothing</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body1" color="inherit">
          upload img
        </Typography>

        <Button type="submit" variant="contained" color="inherit">
          Create
        </Button>
      </Box>
    </>
  );
}

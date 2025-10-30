import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Auctions() {
  return (
    <>
      <Box component={Link} to="/login">
        <Box
          sx={{ bgcolor: "grey", width: 200, height: 200, borderRadius: 1 }}
        ></Box>
        {/* this is an image */}
        <Typography>Name</Typography>
        <Typography color="grey">Current price: 00.00</Typography>
      </Box>
    </>
  );
}

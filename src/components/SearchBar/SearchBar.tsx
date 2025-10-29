import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <TextField sx={{ width: 500 }} label="Search auctions" />
      </Box>
    </>
  );
}

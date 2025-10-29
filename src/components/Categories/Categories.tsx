import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const categories = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Sports", icon: <SportsBasketballIcon /> },
  { label: "Music", icon: <MusicNoteIcon /> },
  { label: "Electronics", icon: <DevicesIcon /> },
  { label: "Clothing", icon: <CheckroomIcon /> },
  { label: "Other", icon: <MoreHorizIcon /> },
];

export default function Categories() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        p: 2,
      }}
    >
      {categories.map(({ label, icon }) => (
        <Box
          key={label}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ":hover": { color: "grey", cursor: "pointer" },
          }}
        >
          {icon}
          <Typography>{label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

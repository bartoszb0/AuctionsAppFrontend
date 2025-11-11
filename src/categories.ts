import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

export const categories = [
  { name: "home", icon: HomeIcon },
  { name: "music", icon: MusicNoteIcon },
  { name: "sports", icon: SportsBasketballIcon },
  { name: "electronics", icon: DevicesIcon },
  { name: "clothing", icon: CheckroomIcon },
  { name: "other", icon: MoreHorizIcon },
] as const;

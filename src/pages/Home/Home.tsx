import { Container, Typography } from "@mui/material";
import Auctions from "../../components/Auctions/Auctions";
import Categories from "../../components/Categories/Categories";
import SearchBar from "../../components/SearchBar/SearchBar";
import TopMenu from "../../components/TopMenu/TopMenu";

export default function Home() {
  return (
    <>
      <TopMenu />
      <Container>
        <SearchBar />
        <Categories />
        <Typography variant="h5" color="inherit">
          All Auctions
        </Typography>
        <Auctions />
      </Container>
    </>
  );
}

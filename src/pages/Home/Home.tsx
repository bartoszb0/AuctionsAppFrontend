import { Container } from "@mui/material";
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
      </Container>
    </>
  );
}

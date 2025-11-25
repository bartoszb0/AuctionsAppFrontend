import { Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { categories } from "../categories";

export default function Categories() {
  const navigate = useNavigate();

  function categoryRedirect(category: string) {
    navigate(`/search?category=${category}`);
  }

  const categoriesElement = categories.map(({ name, icon: Icon }) => {
    return (
      <Button
        key={name}
        mt="xl"
        h="110px"
        w="120px"
        onClick={() => categoryRedirect(name)}
      >
        <Flex
          align="center"
          justify="center"
          direction="column"
          h="100%"
          w="100%"
        >
          <Icon />
          <h3 style={{ textAlign: "center", marginTop: "8px" }}>
            {name[0].toUpperCase() + name.slice(1)}
          </h3>
        </Flex>
      </Button>
    );
  });

  return (
    <Flex gap="10px" justify="center" align="center" wrap="wrap">
      {categoriesElement}
    </Flex>
  );
}

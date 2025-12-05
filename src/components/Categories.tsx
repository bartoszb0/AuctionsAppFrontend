import { Button, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import { categories } from "../constants/categories";

export default function Categories() {
  const categoriesElement = categories.map(({ name, icon: Icon }) => {
    return (
      <Button key={name} component={Link} to={`/search?category=${name}`}>
        <Flex align="center" justify="center" gap="5px">
          <Icon />
          <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
        </Flex>
      </Button>
    );
  });

  return (
    <Flex
      gap="10px"
      mt="md"
      justify="center"
      align="center"
      wrap="wrap"
      p="5px"
    >
      {categoriesElement}
    </Flex>
  );
}

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
        justify="center"
        mt="xl"
        onClick={() => categoryRedirect(name)}
      >
        <Flex justify="center" align="center" gap="5px">
          <Icon />
          <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
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

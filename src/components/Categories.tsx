import { Flex, Group } from "@mantine/core";
import { categories } from "../categories";

export default function Categories() {
  const categoriesElement = categories.map(({ name, icon: Icon }) => {
    return (
      <Flex
        key={name}
        justify="center"
        align="center"
        direction="column"
        mt="xl"
      >
        <Icon />
        <h3>{name}</h3>
      </Flex>
    );
  });

  return <Group>{categoriesElement}</Group>;
}

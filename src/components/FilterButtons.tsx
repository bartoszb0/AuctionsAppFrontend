import { Burger, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function FilterButtons() {
  const [filterOpened, { toggle: filterToggle }] = useDisclosure();

  return (
    <Flex>
      <Burger opened={filterOpened} onClick={filterToggle} />
      {filterOpened && <Button>xd</Button>}
    </Flex>
  );
}

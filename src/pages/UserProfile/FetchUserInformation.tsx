import { Box, Flex, Group, Text } from "@mantine/core";
import UseFetchUser from "../../hooks/queries/useFetchUser";
import { isAuthenticated } from "../../utils/isAuthenticated";
import UserFollowSection from "./UserFollowSection";

type FetchUserInformationProps = {
  userId: number;
};

export default function FetchUserInformation({
  userId,
}: FetchUserInformationProps) {
  const auth = isAuthenticated();

  const { data: user } = UseFetchUser(userId);

  return (
    <>
      <Flex align="center" justify="center" mt="xl" direction="column" mb="xl">
        <Text size="30px" fw={500}>
          {user.username}
        </Text>

        <UserFollowSection auth={auth} user={user} />

        <Group gap="xl" mt="xl">
          <Box bg="dark.5" p="sm" bdrs="sm">
            <Text size="40px" fw={700}>
              5.0
            </Text>
            <Text>Average Rating</Text>
          </Box>
          <Box bg="dark.5" p="sm" bdrs="sm">
            <Text size="40px" fw={700}>
              {user.open_auctions_count}
            </Text>
            <Text>Active Auctions</Text>
          </Box>
          <Box bg="dark.5" p="sm" bdrs="sm">
            <Text size="40px" fw={700}>
              {user.auctions_count}
            </Text>
            <Text>Created Auctions</Text>
          </Box>
        </Group>
      </Flex>
      <Flex align="center" justify="center" mt="xl" direction="column" mb="xl">
        <Text size="30px" fw={700}>
          {user.username}'s auctions
        </Text>
      </Flex>
    </>
  );
}

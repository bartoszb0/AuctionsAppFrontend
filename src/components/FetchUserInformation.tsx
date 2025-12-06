import { Box, Button, Flex, Group, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { UserProfile } from "../types/types";
import api from "../utils/api";
import { isAuthenticated } from "../utils/isAuthenticated";

type FetchUserInformationProps = {
  userId: number;
};

export default function FetchUserInformation({
  userId,
}: FetchUserInformationProps) {
  const auth = isAuthenticated();

  const fetchUser = async (): Promise<UserProfile> => {
    const response = await api.get(`users/${userId}/`);
    return response.data;
  };

  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: fetchUser,
  });

  ///

  const [followersLength, setFollowersLength] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFollowersLength(user.followers.length);

    if (auth.userId !== user.id) {
      const following = user.followers.some((f) => f.id == auth.userId);
      setIsFollowing(following);
    }
  }, [user, auth.userId]);

  const handleFollowClick = async () => {
    try {
      await api.post(`/users/${userId}/follow/`);
    } catch (err) {
      console.error(err);
    }

    // UI update
    if (isFollowing) {
      setFollowersLength((prev) => prev - 1);
    } else {
      setFollowersLength((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
  };

  return (
    <>
      <Flex align="center" justify="center" mt="xl" direction="column" mb="xl">
        <Text size="30px" fw={500}>
          {user.username}
        </Text>

        <Group>
          <h3>Followers: {followersLength}</h3>
          <h3>Following: {user.following.length}</h3>
        </Group>
        {auth.isAuthenticated && auth.userId != user.id && (
          <Button
            onClick={handleFollowClick}
            variant={isFollowing ? "outline" : "filled"}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}

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

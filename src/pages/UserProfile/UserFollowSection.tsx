import { Button, Group } from "@mantine/core";
import useToggleUserFollow from "../../hooks/mutations/useToggleUserFollow";
import type { AuthStatus, UserProfile } from "../../types/types";

type UserFollowSectionProps = {
  auth: AuthStatus;
  user: UserProfile;
};

export default function UserFollowSection({
  auth,
  user,
}: UserFollowSectionProps) {
  const { mutate, isPending } = useToggleUserFollow(user.id);

  return (
    <>
      <Group>
        <h3>Followers: {user.followers_count}</h3>
        <h3>Following: {user.following_count}</h3>
      </Group>
      {auth.isAuthenticated && auth.userId != user.id && (
        <Button
          onClick={() => mutate()}
          variant={user.is_following ? "outline" : "filled"}
          disabled={isPending}
        >
          {user.is_following ? "Unfollow" : "Follow"}
        </Button>
      )}
    </>
  );
}

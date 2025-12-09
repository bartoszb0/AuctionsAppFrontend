import { Button, Group } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AuthStatus, UserProfile } from "../../types/types";
import api from "../../utils/api";

type UserFollowSectionProps = {
  auth: AuthStatus;
  user: UserProfile;
};

export default function UserFollowSection({
  auth,
  user,
}: UserFollowSectionProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => api.post(`/users/${user.id}/follow/`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user", user.id] });

      const previous = queryClient.getQueryData<UserProfile>(["user", user.id]);

      if (previous) {
        queryClient.setQueryData<UserProfile>(["user", user.id], {
          ...previous,
          is_following: !previous.is_following,
          followers_count: previous.is_following
            ? previous.followers_count - 1
            : previous.followers_count + 1,
        });
      }

      return previous;
    },
    onError: (error, _, context) => {
      if (context) {
        queryClient.setQueryData<UserProfile>(["user", user.id], context);
      }
      toast.error(error.message);
    },
  });

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

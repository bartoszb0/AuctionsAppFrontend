import { Button, Group } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { AuthStatus, UserProfile } from "../../types/types";
import api from "../../utils/api";

type UserFollowSectionProps = {
  auth: AuthStatus;
  userId: number;
  user: UserProfile;
};

export default function UserFollowSection({
  auth,
  userId,
  user,
}: UserFollowSectionProps) {
  const [followersLength, setFollowersLength] = useState(user.followers.length);
  const [isFollowing, setIsFollowing] = useState(
    user.followers.some((f) => f.id === auth.userId)
  );

  useEffect(() => {
    setFollowersLength(user.followers.length);
    if (auth.userId !== user.id) {
      const following = user.followers.some((f) => f.id == auth.userId);
      setIsFollowing(following);
    }
  }, [userId, auth.userId]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await api.post(`/users/${userId}/follow/`);
    },
    onMutate: async () => {
      const context = {
        followers: followersLength,
        following: isFollowing,
      };
      setFollowersLength((prev) => (isFollowing ? prev - 1 : prev + 1));
      setIsFollowing((prev) => !prev);
      return context;
    },
    onError: (error, _, context) => {
      if (context) {
        setIsFollowing(context.following);
        setFollowersLength(context.followers);
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Group>
        <h3>Followers: {followersLength}</h3>
        <h3>Following: {user.following.length}</h3>
      </Group>
      {auth.isAuthenticated && auth.userId != user.id && (
        <Button
          onClick={() => mutate()}
          variant={isFollowing ? "outline" : "filled"}
          disabled={isPending}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </>
  );
}

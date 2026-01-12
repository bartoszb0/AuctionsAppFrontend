import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { UserProfile } from "../../types/types";
import api from "../../utils/api";

export default function useToggleUserFollow(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.post(`/users/${userId}/follow/`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["user", userId] });

      const previous = queryClient.getQueryData<UserProfile>(["user", userId]);

      if (previous) {
        const newIsFollowing = !previous.is_following;
        queryClient.setQueryData<UserProfile>(["user", userId], {
          ...previous,
          is_following: newIsFollowing,
          followers_count: previous.followers_count + (newIsFollowing ? 1 : -1),
        });
      }

      return previous;
    },
    onError: (error, _, context) => {
      if (context) {
        queryClient.setQueryData<UserProfile>(["user", userId], context);
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
}

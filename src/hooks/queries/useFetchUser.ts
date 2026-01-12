import { useSuspenseQuery } from "@tanstack/react-query";
import type { UserProfile } from "../../types/types";
import api from "../../utils/api";

export default function UseFetchUser(userId: number) {
  return useSuspenseQuery<UserProfile>({
    queryKey: ["user", userId],
    queryFn: () => api.get(`users/${userId}/`).then((res) => res.data),
  });
}

import { jwtDecode, type JwtPayload } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants/constants";
import type { AuthStatus } from "../types/types";

interface MyJwtPayload extends JwtPayload {
  user_id: number;
  username: string;
}

export function isAuthenticated(): AuthStatus {
  const access = localStorage.getItem(ACCESS_TOKEN);

  if (!access) {
    return { userId: null, isAuthenticated: false, username: null };
  }

  try {
    const decoded = jwtDecode<MyJwtPayload>(access);

    return {
      userId: decoded.user_id,
      username: decoded.username,
      isAuthenticated: Date.now() < (decoded.exp || 0) * 1000,
    };
  } catch {
    return { userId: null, isAuthenticated: false, username: null };
  }
}

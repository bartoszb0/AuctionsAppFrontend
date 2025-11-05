import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants/constants";

export function isAuthenticated() {
  const access = localStorage.getItem(ACCESS_TOKEN);
  if (!access) return false;

  try {
    const { exp }: { exp: number } = jwtDecode(access);
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
}

import { useCallback } from "react";
import { usePostHog } from "posthog-js/react";
import { Login, Signup, LogOut, checkAuth } from "../service/authService";
import { useAuthStore } from "../store/useAuthStore";

export default function useAuth() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const isLoading = useAuthStore((state) => state.isLoading);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const posthog = usePostHog();

  function identify(userPayload) {
    if (!userPayload) return;
    posthog?.identify(String(userPayload.id), {
      email: userPayload.email,
      username: userPayload.username,
    });
  }

  async function login(username, password) {
    const userPayload = await Login(username, password);
    setUser(userPayload);
    identify(userPayload);
  }

  async function signup(username, email, password) {
    const userPayload = await Signup(username, email, password);
    setUser(userPayload);
    identify(userPayload);
  }

  async function logout() {
    await LogOut();
    setUser(null);
    posthog?.reset();
  }

  const checkauth = useCallback(
    async () => {
      try {
        setIsLoading(true);
        const userPayload = await checkAuth();
        setUser(userPayload.data.user);
        identify(userPayload.data.user);
      } catch (error) {
        console.error("Session verification failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setUser, setIsLoading]
  );

  return { user, login, logout, signup, checkauth, isLoading };
}
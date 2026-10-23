import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "./authContext.js";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} from "../services/auth.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const data = await getCurrentUser();
      const currentUser = data?.user ?? null;

      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        const data = await getCurrentUser();

        if (isMounted) {
          setUser(data?.user ?? null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials);

    if (!data?.user) {
      throw new Error(
        "Login succeeded without returning user information."
      );
    }

    setUser(data.user);
    setLoading(false);

    return data;
  }, []);

  const register = useCallback(async (details) => {
    const data = await registerUser(details);

    if (!data?.user) {
      throw new Error(
        "Registration succeeded without returning user information."
      );
    }

    setUser(data.user);
    setLoading(false);

    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
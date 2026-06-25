"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChange, getUser } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  userId: string | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    getUser().then((user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Subscribe to changes
    const subscription = onAuthStateChange((sessionUser) => {
      setUser(sessionUser);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        userId: user?.id ?? null,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

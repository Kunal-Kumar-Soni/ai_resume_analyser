"use client";
import { createContext, useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    setIsLoading(true);
    const { data } = await supabaseClient.auth.getSession();
    setUser(data.session?.user ?? null);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
    const { data: listener } = supabaseClient.auth.onAuthStateChange((e, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
};

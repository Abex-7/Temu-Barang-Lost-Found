import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isConfigured: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Ambil session yang tersimpan saat startup (Rehidrasi Sesi)
    const initSession = async () => {
      try {
        if (!isSupabaseConfigured) {
          // Jika Supabase belum dikonfigurasi dengan URL asli, bypass agar tidak stuck
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.getSession();
        if (!error && data?.session && isMounted) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch {
        // Fallback jika secure store atau network gagal
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initSession();

    // 2. Berlangganan perubahan status auth secara real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        if (isMounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch {
      // Abaikan error signOut
    } finally {
      setUser(null);
      setSession(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

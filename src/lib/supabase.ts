import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

/**
 * Adapter penyimpanan sesi khusus untuk Expo SecureStore.
 * Token JWT disimpan terenkripsi di hardware (iOS Keychain / Android Keystore),
 * BUKAN di AsyncStorage yang tidak aman.
 */
const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === "web") {
        return typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
      }
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(key, value);
        }
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Abaikan error penyimpanan
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem(key);
        }
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch {
      // Abaikan error penghapusan
    }
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(
  process.env.EXPO_PUBLIC_SUPABASE_URL &&
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.EXPO_PUBLIC_SUPABASE_URL.includes("your-project-id") &&
  !process.env.EXPO_PUBLIC_SUPABASE_URL.includes("placeholder-project")
);

/**
 * Singleton client Supabase terpusat untuk seluruh aplikasi.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

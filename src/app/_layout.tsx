import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { colors } from "../styles/styles";

function RouteGuardLayout() {
  const { user, loading, isConfigured } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Codelab 4.2: Navigation Guards & Segmen Rute
    const segs = segments as string[];
    const inAuthGroup = segs.includes("(auth)") || segs.includes("login");

    if (isConfigured) {
      if (!user && !inAuthGroup) {
        // Tamu yang belum login diarahkan ke /login
        router.replace("/login" as any);
      } else if (user && inAuthGroup) {
        // User yang sudah login diarahkan ke halaman utama
        router.replace("/");
      }
    }
  }, [user, loading, segments, isConfigured]);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Temu Barang",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="barang/tambah"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profil"
        options={{
          title: "Profil Pengguna",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="barang/[id]"
        options={{
          title: "Detail Barang",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RouteGuardLayout />
    </AuthProvider>
  );
}

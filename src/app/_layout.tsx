import { Stack } from "expo-router";
import { colors } from "../styles/styles";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: "700",
          color: colors.textPrimary,
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Temu Barang", headerShown: false }}
      />
      <Stack.Screen
        name="barang/[id]"
        options={{
          title: "Detail Barang",
          headerBackTitle: "Kembali",
        }}
      />
      <Stack.Screen
        name="profil"
        options={{
          title: "Profil Pengguna",
          headerBackTitle: "Kembali",
        }}
      />
    </Stack>
  );
}

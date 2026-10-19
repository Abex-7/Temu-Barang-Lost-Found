import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Temu Barang", headerShown: false }}
      />
      <Stack.Screen
        name="barang/[id]"
        options={{ title: "Detail Barang" }}
      />
    </Stack>
  );
}
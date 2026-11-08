import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoadingProps {
  pesan?: string;
}

export default function Loading({ pesan = "Memuat data..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#16a322" />
      <Text style={styles.teks}>{pesan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  teks: {
    marginTop: 12,
    fontSize: 14,
    color: "#64748b",
  },
});
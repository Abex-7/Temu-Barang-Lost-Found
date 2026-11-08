import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { colors } from "../styles/styles";

interface LoadingProps {
  pesan?: string;
}

export default function Loading({ pesan = "Memuat data barang..." }: LoadingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorWrap}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
      <Text style={styles.teks}>{pesan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 56,
    paddingHorizontal: 20,
  },
  indicatorWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
  },
  teks: {
    marginTop: 14,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
  },
});

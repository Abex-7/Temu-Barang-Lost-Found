import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/styles";

interface ErrorMessageProps {
  pesan: string;
  onUlangi: () => void;
}

export default function ErrorMessage({ pesan, onUlangi }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons
            name="alert-circle"
            size={36}
            color={colors.primary}
          />
        </View>
        <Text style={styles.judul}>Gagal Memuat Data</Text>
        <Text style={styles.pesan}>{pesan}</Text>

        <Pressable
          style={styles.tombol}
          onPress={onUlangi}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        >
          <Ionicons name="refresh" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.tombolText}>Coba Lagi</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
  },
  judul: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  pesan: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 18,
  },
  tombol: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 26,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  tombolText: {
    color: colors.textInverted,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});

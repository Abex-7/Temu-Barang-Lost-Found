import { Pressable, StyleSheet, Text, View } from "react-native";

interface ErrorMessageProps {
  pesan: string;
  onUlangi: () => void;
}

export default function ErrorMessage({ pesan, onUlangi }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.judul}>Gagal memuat data</Text>
      <Text style={styles.pesan}>{pesan}</Text>

      <Pressable style={styles.tombol} onPress={onUlangi}>
        <Text style={styles.tombolText}>Coba Lagi</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  judul: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ef4444",
    marginBottom: 6,
  },
  pesan: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 16,
  },
  tombol: {
    backgroundColor: "#16a322",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  tombolText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

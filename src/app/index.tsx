import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BarangCard from "../components/BarangCard";
import SearchBar from "../components/SearchBar";
import { daftarBarang } from "../data/barang";

export default function Index() {
  // Custom function: dipanggil saat tombol ditekan
  const laporBarang = () => {
    Alert.alert(
      "Lapor Barang",
      "Fitur lapor barang akan hadir di modul berikutnya.",
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temu Barang</Text>
      <Text style={styles.subtitle}>Lost & Found</Text>

      <SearchBar />

      <ScrollView>
        {daftarBarang.map((barang) => (
          <BarangCard key={barang.id} barang={barang} />
        ))}
      </ScrollView>

      <Pressable style={styles.tombol} onPress={laporBarang}>
        <Text style={styles.tombolText}>+ Laporkan Barang</Text>
      </Pressable>
    </View>
  );
}

// Internal styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
  },
  tombol: {
    backgroundColor: "#ed0b0b",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  tombolText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

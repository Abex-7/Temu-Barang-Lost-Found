import { View, Text, Image } from "react-native";
import { styles } from "../styles/styles";
import { Barang } from "../types/barang";

// Props: data satu barang yang dikirim dari halaman utama
interface BarangCardProps {
  barang: Barang;
}

export default function BarangCard({ barang }: BarangCardProps) {
  // Warna badge bergantung pada status, jadi dipakai inline style
  const warnaBadge = barang.status === "Ditemukan" ? "#16a34a" : "#f97316";

  return (
    <View style={styles.card}>
      <Image source={{ uri: barang.gambar }} style={styles.gambar} />

      <View style={styles.info}>
        <Text style={styles.nama}>{barang.nama}</Text>
        <Text style={styles.detail}>Kategori: {barang.kategori}</Text>
        <Text style={styles.detail}>Lokasi: {barang.lokasi}</Text>

        <View style={[styles.badge, { backgroundColor: warnaBadge }]}>
          <Text style={styles.badgeText}>{barang.status}</Text>
        </View>
      </View>
    </View>
  );
}
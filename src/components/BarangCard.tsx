import { View, Text, Image, Pressable } from "react-native";
import { styles } from "../styles/styles";
import { Barang } from "../types/barang";

interface BarangCardProps {
  barang: Barang;
  disimpan: boolean;
  onPress: () => void;
  onToggleSimpan: () => void;
}

export default function BarangCard({
  barang,
  disimpan,
  onPress,
  onToggleSimpan,
}: BarangCardProps) {
  // Warna teks label bergantung pada status, jadi dipakai inline style
  const warnaStatus = barang.status === "Ditemukan" ? "#16a34a" : "#f97316";

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.gambarWrap}>
        <Image source={{ uri: barang.gambar }} style={styles.gambar} />

        {/* Label status di kiri atas */}
        <View style={styles.pill}>
          <Text style={[styles.pillText, { color: warnaStatus }]}>
            {barang.status}
          </Text>
        </View>

        {/* Hati di kanan atas */}
        <Pressable style={styles.hati} onPress={onToggleSimpan}>
          <Text style={[styles.hatiText, disimpan && styles.hatiAktif]}>
            {disimpan ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.nama} numberOfLines={1}>
        {barang.nama}
      </Text>
      <Text style={styles.detail} numberOfLines={1}>
        {barang.lokasi} · {barang.kategori}
      </Text>
    </Pressable>
  );
}
// 15
//const warnaStatus =
 // barang.status === "Ditemukan" ? "#15803d" : "#dc2626";
 //41 
 //<Text style={styles.nama} numberOfLines={2}>
  //{barang.nama}
//</Text>
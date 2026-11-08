import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "../styles/styles";
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
  const isDitemukan = barang.status === "Ditemukan";

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: "rgba(88, 24, 37, 0.08)" }}
    >
      <View style={styles.gambarWrap}>
        <Image
          source={{ uri: barang.gambar }}
          style={styles.gambar}
        />

        {/* Tag status di kiri atas berlatar soft maroon / muted tint */}
        <View style={styles.pill}>
          <Text style={styles.pillText}>
            {isDitemukan ? "✓ " : "• "}
            {barang.status}
          </Text>
        </View>

        {/* Tombol Simpan / Hati di kanan atas */}
        <Pressable
          style={styles.hati}
          onPress={onToggleSimpan}
          hitSlop={6}
        >
          <Ionicons
            name={disimpan ? "heart" : "heart-outline"}
            size={18}
            color={disimpan ? colors.primary : colors.textSecondary}
          />
        </Pressable>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.nama} numberOfLines={1}>
          {barang.nama}
        </Text>

        <View style={styles.cardMetaRow}>
          <Ionicons
            name="location-outline"
            size={13}
            color={colors.primary}
          />
          <Text style={styles.detail} numberOfLines={1}>
            {barang.lokasi} · {barang.kategori}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

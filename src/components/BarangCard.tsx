import React from "react";
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

/**
 * BarangCard - Mengadopsi tata letak DoorDash Store/Item Card:
 * - Rasio aspek gambar 16:9 yang sinematik & bersih
 * - Floating status badge di sudut kiri atas
 * - Floating action button bookmark / simpan di sudut kanan atas
 * - Tipografi hierarkis tebal dengan pemisah titik (dot separator)
 */
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
          source={{
            uri:
              barang.gambar ||
              `https://picsum.photos/seed/${encodeURIComponent(barang.nama)}/300/200`,
          }}
          style={styles.gambar}
        />

        {/* Floating Status Pill Overlay (DoorDash Delivery/Tag Style) */}
        <View
          style={[
            styles.pill,
            isDitemukan ? styles.pillFound : styles.pillLost,
          ]}
        >
          <Ionicons
            name={isDitemukan ? "checkmark-circle" : "megaphone"}
            size={12}
            color={
              isDitemukan ? colors.statusFoundText : colors.statusLostText
            }
          />
          <Text
            style={[
              styles.pillText,
              isDitemukan ? styles.pillTextFound : styles.pillTextLost,
            ]}
          >
            {barang.status.toUpperCase()}
          </Text>
        </View>

        {/* Floating Heart / Bookmark Button */}
        <Pressable
          style={styles.hati}
          onPress={onToggleSimpan}
          hitSlop={8}
        >
          <Ionicons
            name={disimpan ? "heart" : "heart-outline"}
            size={18}
            color={disimpan ? colors.primary : colors.textSecondary}
          />
        </Pressable>
      </View>

      {/* Card Info Content */}
      <View style={styles.cardContent}>
        <Text style={styles.nama} numberOfLines={1}>
          {barang.nama}
        </Text>

        <View style={styles.cardMetaRow}>
          <Ionicons
            name="location-sharp"
            size={12}
            color={colors.primary}
          />
          <Text style={styles.detail} numberOfLines={1}>
            {barang.lokasi}
          </Text>
          <Text style={styles.metaDot}>•</Text>
          <Text
            style={[styles.detail, { flex: 0, fontWeight: "600" }]}
            numberOfLines={1}
          >
            {barang.kategori}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

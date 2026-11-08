import { View, Text, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BarangCard from "./BarangCard";
import { Barang } from "../types/barang";
import { styles, colors } from "../styles/styles";

interface BarangSectionProps {
  judul: string;
  data: Barang[];
  disimpan: string[];
  onToggleSimpan: (id: string) => void;
  onBukaDetail: (id: string) => void;
  onLihatSemua: () => void;
}

export default function BarangSection({
  judul,
  data,
  disimpan,
  onToggleSimpan,
  onBukaDetail,
  onLihatSemua,
}: BarangSectionProps) {
  return (
    <View style={styles.section}>
      {/* Header section dengan judul tebal dan action button */}
      <Pressable
        style={styles.sectionHeader}
        onPress={onLihatSemua}
        hitSlop={8}
      >
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>{judul}</Text>
          <View style={styles.sectionCountBadge}>
            <Text style={styles.sectionCountText}>{data.length}</Text>
          </View>
        </View>

        <View style={styles.sectionAction}>
          <Text style={styles.sectionActionText}>Lihat Semua</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.primary}
          />
        </View>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.sectionList}
      >
        {data.map((barang) => (
          <BarangCard
            key={barang.id}
            barang={barang}
            disimpan={disimpan.includes(barang.id)}
            onPress={() => onBukaDetail(barang.id)}
            onToggleSimpan={() => onToggleSimpan(barang.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

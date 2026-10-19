import { View, Text, ScrollView, Pressable } from "react-native";
import BarangCard from "./BarangCard";
import { Barang } from "../types/barang";
import { styles } from "../styles/styles";

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
      {/* Judul + panah: ditekan untuk memfilter tab */}
      <Pressable style={styles.sectionHeader} onPress={onLihatSemua}>
        <Text style={styles.sectionTitle}>{judul}</Text>
        <Text style={styles.sectionPanah}>›</Text>
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
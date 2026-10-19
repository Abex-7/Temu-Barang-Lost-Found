import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "../../styles/styles";
import { daftarBarang, getStatusLabel } from "../../data/barang";

export default function DetailBarang() {
  const router = useRouter();

  // Ambil id dari URL, misalnya /barang/3 -> id = "3"
  const { id } = useLocalSearchParams<{ id: string }>();

  // Cari barang yang id-nya cocok
  const barang = daftarBarang.find((item) => item.id === id);

  // Kembali ke halaman sebelumnya; kalau tidak ada riwayat, ganti ke beranda
  const kembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  // Id tidak cocok dengan barang mana pun
  if (!barang) {
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailContent}>
          <Text style={styles.detailNama}>Barang tidak ditemukan</Text>
          <Text style={styles.detailKeterangan}>
            Barang dengan id "{id}" tidak ada dalam daftar.
          </Text>

          {/* replace: halaman error ini dihapus dari riwayat, bukan ditumpuk */}
          <Pressable
            style={styles.tombolDetail}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.tombolDetailText}>Ke Beranda</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const warnaBadge = barang.status === "Ditemukan" ? "#16a34a" : "#f97316";

  return (
    <ScrollView
      style={styles.detailContainer}
      contentContainerStyle={styles.detailContent}
    >
      <Image source={{ uri: barang.gambar }} style={styles.detailGambar} />

      <Text style={styles.detailNama}>{barang.nama}</Text>

      <View style={[styles.badge, { backgroundColor: warnaBadge }]}>
        <Text style={styles.badgeText}>{barang.status}</Text>
      </View>

      <Text style={styles.detailKeterangan}>{getStatusLabel(barang.status)}</Text>

      <Text style={styles.detailBaris}>Kategori: {barang.kategori}</Text>
      <Text style={styles.detailBaris}>Lokasi: {barang.lokasi}</Text>

      <Pressable style={styles.tombolDetail} onPress={kembali}>
        <Text style={styles.tombolDetailText}>Kembali</Text>
      </Pressable>
    </ScrollView>
  );
}
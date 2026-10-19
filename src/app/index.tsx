import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import BarangSection from "../components/BarangSection";
import { daftarBarang, cariBarang } from "../data/barang";
import { Barang, StatusBarang } from "../types/barang";
import { styles } from "../styles/styles";

// Pilihan tab: "Semua" atau salah satu status barang
type Tab = "Semua" | StatusBarang;

// Data tab (emoji dipakai sebagai ikon sederhana)
const daftarTab: { nama: Tab; emoji: string }[] = [
  { nama: "Semua", emoji: "📦" },
  { nama: "Dicari", emoji: "📢" },
  { nama: "Ditemukan", emoji: "✅" },
];

export default function Index() {
  const router = useRouter();

  // STATE 1: teks pencarian
  const [keyword, setKeyword] = useState<string>("");

  // STATE 2: tab yang sedang dipilih
  const [tab, setTab] = useState<Tab>("Semua");

  // STATE 3: daftar barang hasil pencarian + tab
  const [hasil, setHasil] = useState<Barang[]>(daftarBarang);

  // STATE 4: id barang yang disimpan (hati)
  const [disimpan, setDisimpan] = useState<string[]>([]);

  // EFFECT: hitung ulang hasil setiap keyword atau tab berubah
  useEffect(() => {
    const hasilCari = cariBarang(keyword.trim());
    setHasil(
      tab === "Semua"
        ? hasilCari
        : hasilCari.filter((barang) => barang.status === tab)
    );
  }, [keyword, tab]);

  // Pindah ke halaman detail membawa id barang
  const bukaDetail = (id: string) => {
    router.push({ pathname: "/barang/[id]", params: { id } });
  };

  // Tambah/hapus id dari daftar simpanan
  const toggleSimpan = (id: string) => {
    setDisimpan((sebelumnya) =>
      sebelumnya.includes(id)
        ? sebelumnya.filter((item) => item !== id)
        : [...sebelumnya, id]
    );
  };

  const laporBarang = () => {
    Alert.alert(
      "Lapor Barang",
      "Fitur lapor barang akan hadir di modul berikutnya.",
    );
  };

  // Pisahkan hasil menjadi dua kelompok untuk dua section
  const ditemukan = hasil.filter((barang) => barang.status === "Ditemukan");
  const dicari = hasil.filter((barang) => barang.status === "Dicari");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
  <Image
    source={require("../../assets/images/logo.png")}
    style={styles.logo}
    resizeMode="contain"
  />
  <Text style={styles.subtitle}>Lost & Found</Text>
      </View>

      <SearchBar value={keyword} onChangeText={setKeyword} />

      {/* Tab: Semua / Dicari / Ditemukan */}
      <View style={styles.tabBar}>
        {daftarTab.map((item) => {
          const aktif = tab === item.nama;
          return (
            <Pressable
              key={item.nama}
              style={[styles.tabItem, aktif && styles.tabItemAktif]}
              onPress={() => setTab(item.nama)}
            >
              <Text style={styles.tabEmoji}>{item.emoji}</Text>
              <Text style={[styles.tabLabel, aktif && styles.tabLabelAktif]}>
                {item.nama}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {hasil.length === 0 && (
          <Text style={styles.kosong}>Barang tidak ditemukan</Text>
        )}

        {ditemukan.length > 0 && (
          <BarangSection
            judul="Ditemukan di sekitar kampus"
            data={ditemukan}
            disimpan={disimpan}
            onToggleSimpan={toggleSimpan}
            onBukaDetail={bukaDetail}
            onLihatSemua={() => setTab("Ditemukan")}
          />
        )}

        {dicari.length > 0 && (
          <BarangSection
            judul="Sedang dicari pemiliknya"
            data={dicari}
            disimpan={disimpan}
            onToggleSimpan={toggleSimpan}
            onBukaDetail={bukaDetail}
            onLihatSemua={() => setTab("Dicari")}
          />
        )}
      </ScrollView>

      <Pressable style={styles.tombol} onPress={laporBarang}>
        <Text style={styles.tombolText}>+ Laporkan Barang</Text>
      </Pressable>
    </SafeAreaView>
  );
}

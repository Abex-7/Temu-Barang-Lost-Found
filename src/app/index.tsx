import { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import BarangSection from "../components/BarangSection";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { muatDaftarBarang } from "../services/barangService";
import { Barang, StatusBarang } from "../types/barang";
import { styles, colors } from "../styles/styles";

// Pilihan tab: "Semua" atau salah satu status barang
type Tab = "Semua" | StatusBarang;

export default function Index() {
  const router = useRouter();

  // STATE data dari API
  const [semua, setSemua] = useState<Barang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // STATE tampilan
  const [keyword, setKeyword] = useState<string>("");
  const [tab, setTab] = useState<Tab>("Semua");
  const [hasil, setHasil] = useState<Barang[]>([]);
  const [disimpan, setDisimpan] = useState<string[]>([]);

  // Ambil data dari API (async/await + try/catch/finally)
  const muat = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await muatDaftarBarang();
      setSemua(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // EFFECT 1: [] = jalan sekali saat halaman pertama tampil
  useEffect(() => {
    muat();
  }, []);

  // EFFECT 2: hitung ulang hasil saat data, keyword, atau tab berubah
  useEffect(() => {
    const kata = keyword.trim().toLowerCase();
    const hasilCari = semua.filter((barang) =>
      barang.nama.toLowerCase().includes(kata)
    );
    setHasil(
      tab === "Semua"
        ? hasilCari
        : hasilCari.filter((barang) => barang.status === tab)
    );
  }, [semua, keyword, tab]);

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
    Alert.alert("Lapor Barang", "Fitur lapor barang akan hadir di modul berikutnya.");
  };

  const ditemukan = hasil.filter((barang) => barang.status === "Ditemukan");
  const dicari = hasil.filter((barang) => barang.status === "Dicari");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {/* Header & Status: Bersih, minimalis, dengan title tebal dan subtitle kontras halus */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.brandContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>Lost & Found</Text>
            </View>
          </View>

          <Pressable
            style={styles.headerLocationPill}
            onPress={() => router.push("/profil")}
            hitSlop={6}
          >
            <Ionicons name="location-sharp" size={13} color={colors.primary} />
            <Text style={styles.headerLocationText}>UMM Kampus 3</Text>
          </Pressable>
        </View>

        <Text style={styles.subtitle}>
          Layanan penemuan & pelaporan barang hilang civitas kampus
        </Text>
      </View>

      {/* Search Bar: Input text rounded bergaya pill */}
      <SearchBar value={keyword} onChangeText={setKeyword} />

      {/* Daftar Barang */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Loading pesan="Mengambil data barang kampus..." />
        ) : error ? (
          <ErrorMessage pesan={error} onUlangi={muat} />
        ) : (
          <>
            {hasil.length === 0 && (
              <View style={styles.emptyContainer}>
                <View style={styles.emptyIconWrap}>
                  <Ionicons name="search" size={26} color={colors.primary} />
                </View>
                <Text style={styles.emptyTitle}>Barang Tidak Ditemukan</Text>
                <Text style={styles.emptySubtitle}>
                  {keyword.trim().length > 0
                    ? `Tidak ada barang yang cocok dengan "${keyword}". Coba kata kunci lain.`
                    : "Belum ada barang pada kategori ini."}
                </Text>
              </View>
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
          </>
        )}
      </ScrollView>

      {/* Bottom Area: Tombol Aksi Laporkan + Bottom Tab Navigation Bar */}
      <View style={styles.bottomNavWrapper}>
        <Pressable
          style={styles.tombol}
          onPress={laporBarang}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        >
          <Ionicons name="add-circle" size={19} color="#FFFFFF" />
          <Text style={styles.tombolText}>Laporkan Barang</Text>
        </Pressable>

        {/* Bottom Tab Navigation Bar: Deep Burgundy #581825, icon aktif solid putih, non-aktif semi transparan */}
        <View style={styles.bottomTabBar}>
          <Pressable
            style={styles.bottomTabItem}
            onPress={() => setTab("Semua")}
            hitSlop={6}
          >
            <Ionicons
              name={tab === "Semua" ? "grid" : "grid-outline"}
              size={20}
              color={tab === "Semua" ? colors.tabActive : colors.tabInactive}
            />
            <Text
              style={[
                styles.bottomTabLabel,
                tab === "Semua" && styles.bottomTabLabelAktif,
              ]}
            >
              Semua
            </Text>
          </Pressable>

          <Pressable
            style={styles.bottomTabItem}
            onPress={() => setTab("Dicari")}
            hitSlop={6}
          >
            <Ionicons
              name={tab === "Dicari" ? "megaphone" : "megaphone-outline"}
              size={20}
              color={tab === "Dicari" ? colors.tabActive : colors.tabInactive}
            />
            <Text
              style={[
                styles.bottomTabLabel,
                tab === "Dicari" && styles.bottomTabLabelAktif,
              ]}
            >
              Dicari
            </Text>
          </Pressable>

          <Pressable
            style={styles.bottomTabItem}
            onPress={() => setTab("Ditemukan")}
            hitSlop={6}
          >
            <Ionicons
              name={tab === "Ditemukan" ? "checkmark-circle" : "checkmark-circle-outline"}
              size={20}
              color={tab === "Ditemukan" ? colors.tabActive : colors.tabInactive}
            />
            <Text
              style={[
                styles.bottomTabLabel,
                tab === "Ditemukan" && styles.bottomTabLabelAktif,
              ]}
            >
              Ditemukan
            </Text>
          </Pressable>

          <Pressable
            style={styles.bottomTabItem}
            onPress={() => router.push("/profil")}
            hitSlop={6}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color={colors.tabInactive}
            />
            <Text style={styles.bottomTabLabel}>Profil</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
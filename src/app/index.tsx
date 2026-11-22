import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import BarangSection from "../components/BarangSection";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Logo from "../components/Logo";
import { muatDaftarBarang } from "../services/barangService";
import { Barang, StatusBarang } from "../types/barang";
import { styles, colors } from "../styles/styles";

// Pilihan tab status
type Tab = "Semua" | StatusBarang;

// Kategori barang dengan icon pendukung bergaya DoorDash
const KATEGORI_LIST = [
  { id: "Semua", label: "Semua", icon: "grid-outline" },
  { id: "Kunci", label: "Kunci", icon: "key-outline" },
  { id: "Dompet", label: "Dompet", icon: "wallet-outline" },
  { id: "Elektronik", label: "Elektronik", icon: "phone-portrait-outline" },
  { id: "Tas", label: "Tas", icon: "briefcase-outline" },
  { id: "Dokumen", label: "Dokumen", icon: "card-outline" },
  { id: "Aksesoris", label: "Aksesoris", icon: "watch-outline" },
  { id: "Lainnya", label: "Lainnya", icon: "cube-outline" },
];

export default function Index() {
  const router = useRouter();

  // STATE data dari Supabase / fallback API
  const [semua, setSemua] = useState<Barang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // STATE filter tampilan
  const [keyword, setKeyword] = useState<string>("");
  const [tab, setTab] = useState<Tab>("Semua");
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>("Semua");
  const [hasil, setHasil] = useState<Barang[]>([]);
  const [disimpan, setDisimpan] = useState<string[]>([]);

  // Ambil data dari database cloud Supabase
  const muat = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await muatDaftarBarang();
      setSemua(data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Terjadi kesalahan saat memuat data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await muatDaftarBarang();
      setSemua(data);
    } catch {
      // Abaikan error saat refresh latar
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    muat();
  }, []);

  // Filter reaktif: Keyword + Tab Status + Kategori Chip Carousel
  useEffect(() => {
    const kata = keyword.trim().toLowerCase();
    let filtered = semua.filter((barang) => {
      const matchKeyword =
        barang.nama.toLowerCase().includes(kata) ||
        barang.lokasi.toLowerCase().includes(kata) ||
        barang.kategori.toLowerCase().includes(kata);
      return matchKeyword;
    });

    if (tab !== "Semua") {
      filtered = filtered.filter((barang) => barang.status === tab);
    }

    if (kategoriTerpilih !== "Semua") {
      filtered = filtered.filter((barang) =>
        barang.kategori.toLowerCase().includes(kategoriTerpilih.toLowerCase())
      );
    }

    setHasil(filtered);
  }, [semua, keyword, tab, kategoriTerpilih]);

  const bukaDetail = (id: string) => {
    router.push({ pathname: "/barang/[id]", params: { id } });
  };

  const toggleSimpan = (id: string) => {
    setDisimpan((sebelumnya) =>
      sebelumnya.includes(id)
        ? sebelumnya.filter((item) => item !== id)
        : [...sebelumnya, id]
    );
  };

  const laporBarang = () => {
    router.push("/barang/tambah");
  };

  const ditemukan = hasil.filter((barang) => barang.status === "Ditemukan");
  const dicari = hasil.filter((barang) => barang.status === "Dicari");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {/* 1. Header Minimalis & Modern: TEMU BARANG */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          {/* Logo TEMU BARANG (tanpa Lost&Found) */}
          <Logo variant="full" size="medium" />

          {/* Quick Profile Avatar Shortcut */}
          <Pressable
            onPress={() => router.push("/profil")}
            hitSlop={8}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: colors.surfaceSecondary,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: colors.borderLight,
            }}
          >
            <Ionicons name="person-outline" size={19} color={colors.primary} />
          </Pressable>
        </View>
      </View>

      {/* 2. Search Bar Bergaya DoorDash Full-Pill */}
      <SearchBar
        value={keyword}
        onChangeText={setKeyword}
        onFilterPress={() => {
          if (kategoriTerpilih !== "Semua") setKategoriTerpilih("Semua");
        }}
      />

      {/* 3. DoorDash Category Chips Carousel (Horizontal Scroll) */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryCarousel}
        >
          {KATEGORI_LIST.map((kat) => {
            const isAktif = kategoriTerpilih === kat.id;
            return (
              <Pressable
                key={kat.id}
                style={[
                  styles.categoryChip,
                  isAktif && styles.categoryChipActive,
                ]}
                onPress={() => setKategoriTerpilih(kat.id)}
              >
                <Ionicons
                  name={kat.icon as any}
                  size={15}
                  color={isAktif ? colors.textInverted : colors.primary}
                />
                <Text
                  style={[
                    styles.categoryChipText,
                    isAktif && styles.categoryChipTextActive,
                  ]}
                >
                  {kat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. Filter Status Bar (Semua, Dicari, Ditemukan) */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tabItem, tab === "Semua" && styles.tabItemAktif]}
          onPress={() => setTab("Semua")}
        >
          <Text
            style={[styles.tabLabel, tab === "Semua" && styles.tabLabelAktif]}
          >
            Semua Status
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, tab === "Dicari" && styles.tabItemAktif]}
          onPress={() => setTab("Dicari")}
        >
          <Text style={styles.tabEmoji}>📢</Text>
          <Text
            style={[styles.tabLabel, tab === "Dicari" && styles.tabLabelAktif]}
          >
            Dicari ({semua.filter((b) => b.status === "Dicari").length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, tab === "Ditemukan" && styles.tabItemAktif]}
          onPress={() => setTab("Ditemukan")}
        >
          <Text style={styles.tabEmoji}>✓</Text>
          <Text
            style={[styles.tabLabel, tab === "Ditemukan" && styles.tabLabelAktif]}
          >
            Ditemukan ({semua.filter((b) => b.status === "Ditemukan").length})
          </Text>
        </Pressable>
      </View>

      {/* 5. Main Feed Area dengan Pull to Refresh */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
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
                    : kategoriTerpilih !== "Semua"
                    ? `Belum ada barang di kategori "${kategoriTerpilih}".`
                    : "Belum ada laporan barang yang sesuai."}
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

      {/* 6. DoorDash Bottom Dock: Floating CTA Pill Button + Bottom Tab Bar */}
      <View style={styles.bottomNavWrapper}>
        <Pressable
          style={styles.tombol}
          onPress={laporBarang}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        >
          <Ionicons name="add-circle" size={18} color="#FFFFFF" />
          <Text style={styles.tombolText}>+ Laporkan Barang Baru</Text>
        </Pressable>

        <View style={styles.bottomTabBar}>
          <Pressable
            style={styles.bottomTabItem}
            onPress={() => {
              setTab("Semua");
              setKategoriTerpilih("Semua");
            }}
            hitSlop={6}
          >
            <Ionicons
              name={tab === "Semua" ? "grid" : "grid-outline"}
              size={20}
              color={tab === "Semua" ? colors.primary : colors.textSecondary}
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
              color={tab === "Dicari" ? colors.primary : colors.textSecondary}
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
              name={
                tab === "Ditemukan"
                  ? "checkmark-circle"
                  : "checkmark-circle-outline"
              }
              size={20}
              color={tab === "Ditemukan" ? colors.primary : colors.textSecondary}
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
              color={colors.textSecondary}
            />
            <Text style={styles.bottomTabLabel}>Profil</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

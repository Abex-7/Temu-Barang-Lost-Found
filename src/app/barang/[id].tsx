import { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import { styles, colors } from "../../styles/styles";
import { getStatusLabel } from "../../data/barang";
import { muatDetailBarang } from "../../services/barangService";
import { Barang } from "../../types/barang";

export default function DetailBarang() {
  const router = useRouter();

  // Ambil id dari URL, misalnya /barang/3 -> id = "3"
  const { id } = useLocalSearchParams<{ id: string }>();

  const [barang, setBarang] = useState<Barang | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // EFFECT: ambil detail dari API setiap id berubah
  useEffect(() => {
    const muat = async () => {
      setLoading(true);
      setError(null);
      try {
        setBarang(await muatDetailBarang(id));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    muat();
  }, [id]);

  // Kembali ke halaman sebelumnya; kalau tidak ada riwayat, ganti ke beranda
  const kembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <View style={styles.detailContainer}>
        <Loading pesan="Mengambil detail barang..." />
      </View>
    );
  }

  // Gagal ambil data, atau barang tidak ada
  if (error || !barang) {
    return (
      <View style={styles.detailContainer}>
        <View style={styles.detailContent}>
          <View style={styles.detailCardSurface}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="search" size={28} color={colors.primary} />
            </View>
            <Text style={[styles.detailNama, { textAlign: "center" }]}>
              Barang Tidak Ditemukan
            </Text>
            <Text style={[styles.detailKeterangan, { textAlign: "center" }]}>
              {error ?? `Barang dengan id "${id}" tidak ada dalam sistem.`}
            </Text>

            {/* replace: halaman error ini dihapus dari riwayat, bukan ditumpuk */}
            <Pressable
              style={styles.tombolDetail}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.tombolDetailText}>Kembali ke Beranda</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const isDitemukan = barang.status === "Ditemukan";

  return (
    <ScrollView
      style={styles.detailContainer}
      contentContainerStyle={styles.detailContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero image preview terpusat di atas dengan sudut melengkung elegan */}
      <View style={styles.detailHeroContainer}>
        <Image
          source={{ uri: barang.gambar }}
          style={styles.detailGambar}
        />
        <View style={styles.detailHeroBadge}>
          <Text style={styles.badgeText}>
            {isDitemukan ? "✓ " : "• "}
            {barang.status}
          </Text>
        </View>
      </View>

      {/* Container detail informasi barang dibungkus dalam card surface putih yang bersih */}
      <View style={styles.detailCardSurface}>
        <Text style={styles.detailNama}>{barang.nama}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{barang.status}</Text>
        </View>

        <Text style={styles.detailKeterangan}>
          {getStatusLabel(barang.status)}
        </Text>

        <View style={styles.detailSeparator} />

        {/* Bullet/pill spesifikasi informasi (lokasi, waktu, kategori, kontak) */}
        <Text style={styles.detailSpecsSectionTitle}>
          Spesifikasi Informasi Barang
        </Text>

        <View style={styles.detailSpecsGrid}>
          {/* Spesifikasi: Kategori */}
          <View style={styles.detailSpecCard}>
            <View style={styles.detailSpecIconWrap}>
              <Ionicons
                name="pricetag-outline"
                size={20}
                color={colors.primary}
              />
            </View>
            <View style={styles.detailSpecInfo}>
              <Text style={styles.detailSpecLabel}>Kategori Barang</Text>
              <Text style={styles.detailSpecValue}>{barang.kategori}</Text>
            </View>
          </View>

          {/* Spesifikasi: Lokasi */}
          <View style={styles.detailSpecCard}>
            <View style={styles.detailSpecIconWrap}>
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.primary}
              />
            </View>
            <View style={styles.detailSpecInfo}>
              <Text style={styles.detailSpecLabel}>
                {isDitemukan ? "Lokasi Penemuan" : "Lokasi Terakhir Terlihat"}
              </Text>
              <Text style={styles.detailSpecValue}>{barang.lokasi}</Text>
            </View>
          </View>

          {/* Spesifikasi: Status & Waktu */}
          <View style={styles.detailSpecCard}>
            <View style={styles.detailSpecIconWrap}>
              <Ionicons
                name="time-outline"
                size={20}
                color={colors.primary}
              />
            </View>
            <View style={styles.detailSpecInfo}>
              <Text style={styles.detailSpecLabel}>Status Verifikasi</Text>
              <Text style={styles.detailSpecValue}>
                {getStatusLabel(barang.status)}
              </Text>
            </View>
          </View>

          {/* Spesifikasi: Kontak & Pos Layanan */}
          <View style={styles.detailSpecCard}>
            <View style={styles.detailSpecIconWrap}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={colors.primary}
              />
            </View>
            <View style={styles.detailSpecInfo}>
              <Text style={styles.detailSpecLabel}>Pusat Pengambilan / Informasi</Text>
              <Text style={styles.detailSpecValue}>
                Pos Satpam Kampus & Pusat Informasi
              </Text>
            </View>
          </View>
        </View>

        {/* Action button melayang atau fixed di bagian bawah dengan warna solid deep maroon pill-shaped */}
        <Pressable
          style={styles.tombolDetail}
          onPress={kembali}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        >
          <Text style={styles.tombolDetailText}>Kembali ke Beranda</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
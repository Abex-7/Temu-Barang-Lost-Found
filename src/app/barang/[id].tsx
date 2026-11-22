import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Share,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import { styles, colors } from "../../styles/styles";
import { getStatusLabel } from "../../data/barang";
import {
  muatDetailBarang,
  perbaruiBarang,
  hapusBarang,
} from "../../services/barangService";
import { Barang } from "../../types/barang";
import { useAuth } from "../../context/AuthContext";

/**
 * Halaman Detail Barang - Mengadopsi pola DoorDash Item Detail:
 * - Edge-to-edge Large Hero Image dengan floating circular navigation buttons
 * - Overlapping content sheet dengan rounded top corners 28px
 * - Structured metadata specs grid
 * - RLS Owner control action bar
 * - Sticky bottom full-width pill action button
 */
export default function DetailBarang() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [barang, setBarang] = useState<Barang | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

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

  const kembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleShare = async () => {
    if (!barang) return;
    try {
      await Share.share({
        message: `[Temu Barang UMM] Laporan ${barang.status}: ${barang.nama} di ${barang.lokasi}. Kategori: ${barang.kategori}.`,
      });
    } catch {
      // Abaikan
    }
  };

  // Codelab 5 C: UPDATE data barang (RLS Owner check)
  const handleToggleStatus = async () => {
    if (!barang) return;
    const statusBaru = barang.status === "Ditemukan" ? "Dicari" : "Ditemukan";

    setActionLoading(true);
    try {
      const hasil = await perbaruiBarang(barang.id, { status: statusBaru });
      setBarang(hasil);
      Alert.alert(
        "Status Diperbarui",
        `Status barang berhasil diubah menjadi "${statusBaru}".`
      );
    } catch (err) {
      Alert.alert(
        "Gagal Memperbarui",
        err instanceof Error ? err.message : "Terjadi kesalahan hak akses RLS."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Codelab 5 D: DELETE data barang (RLS Owner check)
  const handleHapus = () => {
    if (!barang) return;

    Alert.alert(
      "Konfirmasi Hapus Laporan",
      `Apakah Anda yakin ingin menghapus laporan "${barang.nama}" dari database?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus Permanen",
          style: "destructive",
          onPress: async () => {
            setActionLoading(true);
            try {
              await hapusBarang(barang.id);
              Alert.alert("Berhasil", "Laporan berhasil dihapus.", [
                { text: "OK", onPress: () => router.replace("/") },
              ]);
            } catch (err) {
              Alert.alert(
                "Gagal Menghapus",
                err instanceof Error
                  ? err.message
                  : "Terjadi pelanggaran hak akses RLS."
              );
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.detailContainer}>
        <Loading pesan="Mengambil detail barang..." />
      </View>
    );
  }

  if (error || !barang) {
    return (
      <View style={styles.detailContainer}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="search" size={28} color={colors.primary} />
          </View>
          <Text style={styles.emptyTitle}>Barang Tidak Ditemukan</Text>
          <Text style={styles.emptySubtitle}>
            {error ?? `Barang dengan ID "${id}" tidak ada dalam sistem.`}
          </Text>
          <Pressable
            style={[styles.tombol, { width: 200, marginTop: 16 }]}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.tombolText}>Kembali ke Beranda</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const isDitemukan = barang.status === "Ditemukan";
  const isOwner = Boolean(user && barang.user_id && barang.user_id === user.id);

  return (
    <View style={styles.detailContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailContent}
      >
        {/* 1. Large Hero Image with Floating Controls */}
        <View style={styles.detailHeroContainer}>
          <Image
            source={{
              uri:
                barang.gambar ||
                `https://picsum.photos/seed/${encodeURIComponent(barang.nama)}/400/300`,
            }}
            style={styles.detailGambar}
          />

          {/* Floating Circle Navigation Top Bar */}
          <View style={styles.detailFloatingTopBar}>
            <Pressable
              style={styles.detailCircleButton}
              onPress={kembali}
              hitSlop={8}
            >
              <Ionicons name="arrow-back" size={20} color={colors.primary} />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                style={styles.detailCircleButton}
                onPress={handleShare}
                hitSlop={8}
              >
                <Ionicons name="share-social-outline" size={19} color={colors.primary} />
              </Pressable>

              <Pressable
                style={styles.detailCircleButton}
                onPress={() => setIsBookmarked((p) => !p)}
                hitSlop={8}
              >
                <Ionicons
                  name={isBookmarked ? "heart" : "heart-outline"}
                  size={20}
                  color={isBookmarked ? colors.primary : colors.textSecondary}
                />
              </Pressable>
            </View>
          </View>

          {/* Status Badge floating at bottom of hero */}
          <View style={styles.detailHeroBadge}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "800",
                color: isDitemukan ? colors.statusFoundText : colors.statusLostText,
              }}
            >
              {isDitemukan ? "✓ TELAH DITEMUKAN" : "📢 SEDANG DICARI"}
            </Text>
          </View>
        </View>

        {/* 2. Overlapping Sheet Card */}
        <View style={styles.detailSheetCard}>
          <Text style={styles.detailNama}>{barang.nama}</Text>

          {/* Tags Row */}
          <View style={styles.detailTagsRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{barang.kategori}</Text>
            </View>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: isDitemukan
                    ? colors.statusFoundBg
                    : colors.statusLostBg,
                  borderColor: isDitemukan
                    ? colors.statusFoundBorder
                    : colors.statusLostBorder,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color: isDitemukan
                      ? colors.statusFoundText
                      : colors.statusLostText,
                  },
                ]}
              >
                {barang.status}
              </Text>
            </View>
          </View>

          <Text style={styles.detailKeterangan}>
            {getStatusLabel(barang.status)}
          </Text>

          <View style={styles.detailSeparator} />

          {/* 3. Specification Grid */}
          <Text style={styles.detailSpecsSectionTitle}>
            Spesifikasi &amp; Lokasi Informasi
          </Text>

          <View style={styles.detailSpecsGrid}>
            {/* Lokasi */}
            <View style={styles.detailSpecCard}>
              <View style={styles.detailSpecIconWrap}>
                <Ionicons
                  name="location-sharp"
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View style={styles.detailSpecInfo}>
                <Text style={styles.detailSpecLabel}>
                  {isDitemukan
                    ? "Lokasi Penemuan Barang"
                    : "Lokasi Terakhir Terlihat"}
                </Text>
                <Text style={styles.detailSpecValue}>{barang.lokasi}</Text>
              </View>
            </View>

            {/* Pos / Kontak Pelapor */}
            <View style={styles.detailSpecCard}>
              <View style={styles.detailSpecIconWrap}>
                <Ionicons
                  name="shield-checkmark"
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View style={styles.detailSpecInfo}>
                <Text style={styles.detailSpecLabel}>
                  Pusat Pengambilan / Pos Layanan
                </Text>
                <Text style={styles.detailSpecValue}>
                  {barang.kontak || "Pos Satpam & Pusat Layanan Kampus 3"}
                </Text>
              </View>
            </View>

            {/* Kategori */}
            <View style={styles.detailSpecCard}>
              <View style={styles.detailSpecIconWrap}>
                <Ionicons
                  name="pricetag-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>
              <View style={styles.detailSpecInfo}>
                <Text style={styles.detailSpecLabel}>Kategori Objek</Text>
                <Text style={styles.detailSpecValue}>{barang.kategori}</Text>
              </View>
            </View>
          </View>

          {/* 4. Action Panel Khusus Pemilik Laporan (RLS Demonstration) */}
          {isOwner && (
            <View
              style={{
                marginTop: 20,
                padding: 16,
                backgroundColor: colors.secondaryTint,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: colors.secondaryTintBorder,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <Ionicons
                  name="key-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "800",
                    color: colors.primary,
                  }}
                >
                  Kelola Laporan Anda (Otorisasi Pemilik - RLS)
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  onPress={handleToggleStatus}
                  disabled={actionLoading}
                  style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    paddingVertical: 11,
                    borderRadius: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  {actionLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Ionicons
                        name="swap-horizontal"
                        size={16}
                        color="#FFFFFF"
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "800",
                          fontSize: 13,
                        }}
                      >
                        Ubah Status
                      </Text>
                    </>
                  )}
                </Pressable>

                <Pressable
                  onPress={handleHapus}
                  disabled={actionLoading}
                  style={{
                    backgroundColor: "#EF4444",
                    paddingVertical: 11,
                    paddingHorizontal: 16,
                    borderRadius: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Ionicons
                    name="trash-outline"
                    size={16}
                    color="#FFFFFF"
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "800",
                      fontSize: 13,
                    }}
                  >
                    Hapus
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 5. Sticky Bottom Action Bar Bergaya DoorDash */}
      <View style={styles.detailStickyBottomBar}>
        <Pressable
          style={styles.tombolDetail}
          onPress={() => {
            Alert.alert(
              "Hubungi Pos Pengambilan",
              `Barang ini dapat diklaim atau dilaporkan di:\n${
                barang.kontak || "Pos Satpam Kampus 3 UMM"
              }\n\nPastikan Anda membawa kartu identitas mahasiswa (KTM) saat proses verifikasi.`,
              [{ text: "Mengerti" }]
            );
          }}
          android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
        >
          <Ionicons name="chatbubbles-outline" size={18} color="#FFFFFF" />
          <Text style={styles.tombolDetailText}>
            {isDitemukan
              ? "Klaim Barang Ini di Pos Pelayanan"
              : "Kirim Informasi Penemuan"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

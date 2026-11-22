import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/styles";
import { useAuth } from "../context/AuthContext";
import { muatDaftarBarang } from "../services/barangService";
import { Barang } from "../types/barang";

/**
 * Halaman Profil Pengguna - Redesigned sesuai Tema UI DoorDash iOS / Prism:
 * - Top Navigation Bar dengan tombol kembali lingkaran (<) seperti detail barang
 * - Profil Card Surface yang modern dan konsisten
 * - 3 Kartu Ringkasan Aktivitas (Stats Row)
 * - Daftar Laporan Pengguna dengan status pill yang selaras
 * - iOS Grouped Inset Menu untuk keamanan sesi & informasi
 * - Tombol Sign Out destruktif berdesain pill bersih
 */
export default function Profil() {
  const router = useRouter();
  const { user, signOut, isConfigured } = useAuth();

  const [laporanSaya, setLaporanSaya] = useState<Barang[]>([]);
  const [loadingLaporan, setLoadingLaporan] = useState<boolean>(true);

  const namaPengguna =
    (user?.user_metadata?.callsign as string) ||
    (user?.user_metadata?.nama as string) ||
    "Mahasiswa UMM";

  const emailPengguna = user?.email || "tamu@webmail.umm.ac.id";

  useEffect(() => {
    const ambilLaporanSaya = async () => {
      setLoadingLaporan(true);
      try {
        const semua = await muatDaftarBarang();
        if (user) {
          const milikSendiri = semua.filter((b) => b.user_id === user.id);
          setLaporanSaya(milikSendiri);
        }
      } catch {
        // Abaikan error laporan latar
      } finally {
        setLoadingLaporan(false);
      }
    };

    ambilLaporanSaya();
  }, [user]);

  const kembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Konfirmasi Keluar",
      "Apakah Anda yakin ingin mengakhiri sesi autentikasi dan keluar dari aplikasi?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar & Kunci Sesi",
          style: "destructive",
          onPress: async () => {
            await signOut();
            router.replace("/login" as any);
          },
        },
      ]
    );
  };

  const jumlahDitemukan = laporanSaya.filter((b) => b.status === "Ditemukan").length;
  const jumlahDicari = laporanSaya.filter((b) => b.status === "Dicari").length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* 1. Header Bar Minimalis dengan Tombol Kembali Lingkaran (Seperti Detail Barang) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        }}
      >
        <Pressable
          onPress={kembali}
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
          <Ionicons name="arrow-back" size={20} color={colors.primary} />
        </Pressable>

        <Text
          style={{
            fontSize: 17,
            fontWeight: "800",
            color: colors.textPrimary,
            letterSpacing: -0.3,
          }}
        >
          Profil Pengguna
        </Text>

        {/* Tombol placeholder penyeimbang */}
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. Profile Card Surface Bergaya DoorDash */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 22,
            padding: 24,
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.borderLight,
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
              },
              android: {
                elevation: 2,
              },
              web: {
                boxShadow: "0 3px 8px rgba(0,0,0,0.04)",
              },
            }),
          }}
        >
          {/* Avatar Lingkaran Burgundy */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 3,
              borderColor: colors.secondaryTint,
              marginBottom: 12,
              position: "relative",
              ...Platform.select({
                ios: {
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                },
                android: {
                  elevation: 4,
                },
                web: {
                  boxShadow: "0 4px 8px rgba(88,24,37,0.25)",
                },
              }),
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "900",
                color: "#FFFFFF",
                letterSpacing: 1,
              }}
            >
              {namaPengguna.slice(0, 2).toUpperCase()}
            </Text>

            {/* Small status indicator pill */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: colors.success,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: colors.surface,
              }}
            >
              <Ionicons name="checkmark" size={13} color="#FFFFFF" />
            </View>
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: colors.textPrimary,
              letterSpacing: -0.4,
            }}
          >
            {namaPengguna}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: colors.textSecondary,
              marginTop: 4,
              fontWeight: "500",
            }}
          >
            {emailPengguna}
          </Text>

          {/* Badge Status Supabase */}
          <View
            style={{
              backgroundColor: colors.secondaryTint,
              borderRadius: 9999,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: colors.secondaryTintBorder,
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Ionicons name="shield-checkmark" size={13} color={colors.primary} />
            <Text
              style={{
                fontSize: 11,
                fontWeight: "800",
                color: colors.primary,
              }}
            >
              {isConfigured
                ? "Akun Cloud Supabase Terverifikasi"
                : "Mode Demo Mahasiswa"}
            </Text>
          </View>
        </View>

        {/* 3. Tiga Kartu Ringkasan Aktivitas (Stats Row) */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colors.surface,
            borderRadius: 20,
            paddingVertical: 14,
            paddingHorizontal: 10,
            marginTop: 14,
            borderWidth: 1,
            borderColor: colors.borderLight,
            justifyContent: "space-around",
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
              },
              android: {
                elevation: 1,
              },
              web: {
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              },
            }),
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: colors.primary,
              }}
            >
              {loadingLaporan ? "..." : laporanSaya.length}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: colors.textSecondary,
                marginTop: 2,
                fontWeight: "600",
              }}
            >
              Laporan Saya
            </Text>
          </View>

          <View
            style={{
              width: 1,
              height: "70%",
              backgroundColor: colors.borderLight,
              alignSelf: "center",
            }}
          />

          <View style={{ alignItems: "center", flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: colors.statusFoundText,
              }}
            >
              {loadingLaporan ? "..." : jumlahDitemukan}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: colors.textSecondary,
                marginTop: 2,
                fontWeight: "600",
              }}
            >
              Ditemukan
            </Text>
          </View>

          <View
            style={{
              width: 1,
              height: "70%",
              backgroundColor: colors.borderLight,
              alignSelf: "center",
            }}
          />

          <View style={{ alignItems: "center", flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: colors.statusLostText,
              }}
            >
              {loadingLaporan ? "..." : jumlahDicari}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: colors.textSecondary,
                marginTop: 2,
                fontWeight: "600",
              }}
            >
              Dicari
            </Text>
          </View>
        </View>

        {/* 4. Daftar Laporan Pengguna (RLS Showcase) */}
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "800",
                color: colors.textPrimary,
                letterSpacing: -0.3,
              }}
            >
              Laporan Anda di Database
            </Text>
            <Pressable
              onPress={() => router.push("/barang/tambah")}
              hitSlop={6}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "800",
                  color: colors.primary,
                }}
              >
                + Tambah Baru
              </Text>
            </Pressable>
          </View>

          {loadingLaporan ? (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={{ marginVertical: 14 }}
            />
          ) : laporanSaya.length === 0 ? (
            <View
              style={{
                padding: 22,
                backgroundColor: colors.surface,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: colors.borderLight,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.secondaryTint,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: colors.textSecondary,
                  textAlign: "center",
                }}
              >
                Anda belum membuat laporan barang pada akun ini.
              </Text>
            </View>
          ) : (
            laporanSaya.map((item) => {
              const isDitemukan = item.status === "Ditemukan";
              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    router.push({
                      pathname: "/barang/[id]",
                      params: { id: item.id },
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.surface,
                    padding: 12,
                    borderRadius: 18,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: colors.borderLight,
                    gap: 12,
                    ...Platform.select({
                      ios: {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.04,
                        shadowRadius: 4,
                      },
                      android: {
                        elevation: 1,
                      },
                      web: {
                        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                      },
                    }),
                  }}
                >
                  <Image
                    source={{
                      uri:
                        item.gambar ||
                        `https://picsum.photos/seed/${encodeURIComponent(
                          item.nama
                        )}/100`,
                    }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      backgroundColor: colors.surfaceSecondary,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "800",
                        color: colors.textPrimary,
                      }}
                      numberOfLines={1}
                    >
                      {item.nama}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        marginTop: 3,
                      }}
                    >
                      <Ionicons
                        name="location-sharp"
                        size={11}
                        color={colors.primary}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: colors.textSecondary,
                        }}
                        numberOfLines={1}
                      >
                        {item.lokasi}
                      </Text>
                    </View>
                  </View>

                  {/* Pill Status Mini */}
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 9999,
                      backgroundColor: isDitemukan
                        ? colors.statusFoundBg
                        : colors.statusLostBg,
                      borderWidth: 1,
                      borderColor: isDitemukan
                        ? colors.statusFoundBorder
                        : colors.statusLostBorder,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "800",
                        color: isDitemukan
                          ? colors.statusFoundText
                          : colors.statusLostText,
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.textMuted}
                  />
                </Pressable>
              );
            })
          )}
        </View>

        {/* 5. iOS Grouped Inset Menu Sections */}
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 20,
            marginTop: 18,
            borderWidth: 1,
            borderColor: colors.borderLight,
            overflow: "hidden",
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 6,
              },
              android: {
                elevation: 1,
              },
              web: {
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              },
            }),
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderLight,
              justifyContent: "space-between",
            }}
            onPress={() => router.push("/barang/tambah")}
            android_ripple={{ color: "rgba(88, 24, 37, 0.05)" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: colors.secondaryTint,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={18}
                  color={colors.primary}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: colors.textPrimary,
                }}
              >
                Buat Laporan Barang Baru
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: colors.borderLight,
              justifyContent: "space-between",
            }}
            onPress={() => {
              Alert.alert(
                "Keamanan Hardware Keystore",
                "Sesi login Anda dilindungi oleh expo-secure-store menggunakan hardware encryption (iOS Keychain / Android KeyStore). Kunci token disimpan aman di hardware perangkat."
              );
            }}
            android_ripple={{ color: "rgba(88, 24, 37, 0.05)" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: colors.secondaryTint,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={colors.primary}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: colors.textPrimary,
                }}
              >
                Keamanan Sesi &amp; Hardware Keystore
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: 0,
              justifyContent: "space-between",
            }}
            onPress={() => {
              Alert.alert(
                "Tentang Temu Barang",
                "Aplikasi Temu Barang Lost & Found v1.0.0\nModul 4 Pemrograman Mobile - Universitas Muhammadiyah Malang."
              );
            }}
            android_ripple={{ color: "rgba(88, 24, 37, 0.05)" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: colors.secondaryTint,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color={colors.primary}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: colors.textPrimary,
                }}
              >
                Tentang Aplikasi Temu Barang
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        {/* 6. Destructive Action Button (Sign Out) */}
        <Pressable
          onPress={handleSignOut}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FEF2F2",
            borderWidth: 1,
            borderColor: "#FECACA",
            borderRadius: 9999,
            paddingVertical: 14,
            marginTop: 20,
            gap: 6,
          }}
        >
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          <Text style={{ color: "#DC2626", fontWeight: "800", fontSize: 14 }}>
            Keluar dari Akun (Sign Out)
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

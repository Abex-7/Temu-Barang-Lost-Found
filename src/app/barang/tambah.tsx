import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { tambahBarangBaru } from "../../services/barangService";
import { StatusBarang } from "../../types/barang";
import { colors } from "../../styles/styles";

const KATEGORI_OPTIONS = [
  "Kunci",
  "Dompet",
  "Elektronik",
  "Tas",
  "Dokumen",
  "Aksesoris",
  "Lainnya",
];

const LOKASI_OPTIONS = [
  "Kantin Kampus 3",
  "Parkiran GKB 1",
  "Parkiran GKB 2",
  "Lab Informatika",
  "Perpustakaan Lt. 1",
  "Masjid AR Fachruddin",
  "GKB 1 / GKB 2",
  "Helipad UMM",
  "Lainnya",
];

/**
 * TambahBarangScreen - Mengadopsi pola DoorDash Form & Checkout Sections:
 * - Segmented Pill Control di bagian atas (Kehilangan vs Menemukan)
 * - Pengelompokan field ke dalam kartu-kartu bersih (Card Sections)
 * - Chip selector horizontal ergonomis
 * - Full-width pill action button di bagian bawah
 */
export default function TambahBarangScreen() {
  const router = useRouter();

  const [nama, setNama] = useState<string>("");
  const [kategori, setKategori] = useState<string>("Kunci");
  const [lokasi, setLokasi] = useState<string>("Kantin Kampus 3");
  const [status, setStatus] = useState<StatusBarang>("Ditemukan");
  const [gambar, setGambar] = useState<string>("");
  const [kontak, setKontak] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSimpan = async () => {
    const cleanNama = nama.trim();
    if (!cleanNama) {
      Alert.alert("Form Belum Lengkap", "Nama barang wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      await tambahBarangBaru({
        nama: cleanNama,
        kategori,
        lokasi,
        status,
        gambar: gambar.trim() || undefined,
        kontak: kontak.trim() || undefined,
      });

      Alert.alert(
        "Berhasil 🎉",
        "Laporan barang berhasil disimpan ke database cloud Supabase.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]
      );
    } catch (err) {
      Alert.alert(
        "Gagal Menyimpan",
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan data ke database."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* 1. Header Bar Minimalis */}
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
          onPress={() => router.back()}
          hitSlop={8}
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: colors.surfaceSecondary,
            alignItems: "center",
            justifyContent: "center",
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
          Laporkan Barang
        </Text>

        <View style={{ width: 36 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 2. DoorDash Pill Segmented Switcher (Jenis Laporan) */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.inputBg,
              borderRadius: 9999,
              padding: 4,
              marginBottom: 18,
            }}
          >
            <Pressable
              onPress={() => setStatus("Ditemukan")}
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: "center",
                borderRadius: 9999,
                backgroundColor:
                  status === "Ditemukan" ? colors.primary : "transparent",
              }}
            >
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 13,
                  color:
                    status === "Ditemukan" ? "#FFFFFF" : colors.textSecondary,
                }}
              >
                ✓ Saya Menemukan
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setStatus("Dicari")}
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: "center",
                borderRadius: 9999,
                backgroundColor:
                  status === "Dicari" ? colors.primary : "transparent",
              }}
            >
              <Text
                style={{
                  fontWeight: "800",
                  fontSize: 13,
                  color:
                    status === "Dicari" ? "#FFFFFF" : colors.textSecondary,
                }}
              >
                📢 Saya Kehilangan
              </Text>
            </Pressable>
          </View>

          {/* CARD SECTION 1: Informasi Utama Barang */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.borderLight,
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                color: colors.textPrimary,
                marginBottom: 12,
              }}
            >
              Informasi Barang
            </Text>

            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.textSecondary,
                  marginBottom: 6,
                }}
              >
                Nama Barang *
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.surfaceSecondary,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  height: 48,
                  fontSize: 14,
                  color: colors.textPrimary,
                }}
                placeholder="Contoh: Dompet Kulit Hitam Eiger"
                placeholderTextColor={colors.textMuted}
                value={nama}
                onChangeText={setNama}
              />
            </View>

            {/* Pilihan Kategori Horizontal Chips */}
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.textSecondary,
                  marginBottom: 8,
                }}
              >
                Kategori Barang
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {KATEGORI_OPTIONS.map((item) => {
                    const terpilih = kategori === item;
                    return (
                      <Pressable
                        key={item}
                        onPress={() => setKategori(item)}
                        style={{
                          paddingHorizontal: 14,
                          paddingVertical: 8,
                          borderRadius: 9999,
                          backgroundColor: terpilih
                            ? colors.primary
                            : colors.surfaceSecondary,
                          borderWidth: 1,
                          borderColor: terpilih
                            ? colors.primary
                            : colors.border,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "700",
                            color: terpilih ? "#FFFFFF" : colors.textPrimary,
                          }}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>

          {/* CARD SECTION 2: Lokasi Kejadian */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.borderLight,
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                color: colors.textPrimary,
                marginBottom: 12,
              }}
            >
              Lokasi Kampus
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
                {LOKASI_OPTIONS.map((loc) => {
                  const terpilih = lokasi === loc;
                  return (
                    <Pressable
                      key={loc}
                      onPress={() => setLokasi(loc)}
                      style={{
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        borderRadius: 9999,
                        backgroundColor: terpilih
                          ? colors.primary
                          : colors.surfaceSecondary,
                        borderWidth: 1,
                        borderColor: terpilih
                          ? colors.primary
                          : colors.border,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "700",
                          color: terpilih ? "#FFFFFF" : colors.textPrimary,
                        }}
                      >
                        {loc}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* CARD SECTION 3: Pos Penjemputan / Kontak */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 18,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.borderLight,
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "800",
                color: colors.textPrimary,
                marginBottom: 12,
              }}
            >
              Pos Layanan / Kontak
            </Text>

            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.textSecondary,
                  marginBottom: 6,
                }}
              >
                Pusat Pengambilan / Pos Satpam (Opsional)
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.surfaceSecondary,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  height: 48,
                  fontSize: 14,
                  color: colors.textPrimary,
                }}
                placeholder="Contoh: Dititipkan di Pos Satpam Gedung A"
                placeholderTextColor={colors.textMuted}
                value={kontak}
                onChangeText={setKontak}
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.textSecondary,
                  marginBottom: 6,
                }}
              >
                Tautan Foto Barang (Opsional)
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.surfaceSecondary,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  paddingHorizontal: 14,
                  height: 48,
                  fontSize: 14,
                  color: colors.textPrimary,
                }}
                placeholder="https://... (kosongkan jika tanpa foto)"
                placeholderTextColor={colors.textMuted}
                value={gambar}
                onChangeText={setGambar}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* 3. DoorDash Full-Pill CTA Button */}
          <Pressable
            onPress={handleSimpan}
            disabled={loading}
            style={{
              backgroundColor: loading ? colors.primaryMuted : colors.primary,
              borderRadius: 9999,
              height: 52,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 10,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={19}
                  color="#FFFFFF"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "800",
                    letterSpacing: 0.2,
                  }}
                >
                  Kirim Laporan ke Database
                </Text>
              </>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

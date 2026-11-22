import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import Logo from "../../components/Logo";
import { styles, colors } from "../../styles/styles";

/**
 * Login / Register Screen - Redesigned dengan sistem DoorDash / Prism:
 * - Menggunakan New Vector Logo Temu Barang
 * - Input cards rounded 14px dengan ikon aksen di sisi kiri
 * - Alert banner yang terintegrasi rapi
 * - Full-pill button CTA Burgundy (#581825)
 */
export default function LoginScreen() {
  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [callsign, setCallsign] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAuth = async () => {
    setErrorMsg(null);

    const cleanEmail = email.trim();
    const cleanPassword = password;
    const cleanCallsign = callsign.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg("Email dan kata sandi wajib diisi.");
      return;
    }

    if (cleanPassword.length < 6) {
      setErrorMsg("Kata sandi minimal harus terdiri dari 6 karakter.");
      return;
    }

    if (isRegistering && !cleanCallsign) {
      setErrorMsg("Nama / Callsign wajib diisi untuk pendaftaran.");
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured) {
        Alert.alert(
          "Mode Demo Offline",
          "Kredensial Supabase di file .env belum diisi. Anda dapat mengisi Project URL & Anon Key di file .env terlebih dahulu.",
          [{ text: "OK" }]
        );
        setLoading(false);
        return;
      }

      if (isRegistering) {
        // Codelab 3.1 A: Pendaftaran (Sign Up)
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
          options: {
            data: {
              callsign: cleanCallsign,
              nama: cleanCallsign,
              role: "student",
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else if (data.session) {
          router.replace("/");
        } else {
          Alert.alert(
            "Pendaftaran Berhasil 🎉",
            "Akun Anda telah berhasil didaftarkan. Silakan masuk.",
            [{ text: "OK", onPress: () => setIsRegistering(false) }]
          );
        }
      } else {
        // Codelab 3.1 B: Otentikasi (Sign In)
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error) {
          // Pengecekan apakah akun tidak terdaftar atau password yang salah
          try {
            const { data: exists } = await supabase.rpc("check_email_exists", {
              email_input: cleanEmail,
            });

            if (exists === false) {
              setErrorMsg(
                "Akun tidak terdaftar di sistem. Anda harus daftar akun terlebih dahulu."
              );
            } else {
              setErrorMsg("Email atau kata sandi yang Anda masukkan salah.");
            }
          } catch {
            // Fallback pesan jika RPC belum terpasang di database
            if (
              error.message.toLowerCase().includes("user not found") ||
              error.message.toLowerCase().includes("not registered")
            ) {
              setErrorMsg(
                "Akun tidak terdaftar di sistem. Anda harus daftar akun terlebih dahulu."
              );
            } else {
              setErrorMsg("Email atau kata sandi yang Anda masukkan salah.");
            }
          }
        } else {
          router.replace("/");
        }
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Terjadi kesalahan sistem."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 22,
            paddingVertical: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Header dengan Logo Vektor Baru */}
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <Logo variant="full" size="large" />

            <Text
              style={{
                fontSize: 22,
                fontWeight: "900",
                color: colors.primary,
                letterSpacing: -0.5,
                marginTop: 18,
                textAlign: "center",
              }}
            >
              {isRegistering ? "Pendaftaran Anggota" : "Masuk ke Temu Barang"}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                marginTop: 4,
                textAlign: "center",
              }}
            >
              Layanan penemuan &amp; pelaporan barang hilang civitas kampus
            </Text>
          </View>

          {/* 2. Banner Error Modern */}
          {errorMsg && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FEF2F2",
                borderWidth: 1,
                borderColor: "#FECACA",
                borderRadius: 14,
                padding: 12,
                marginBottom: 18,
                gap: 8,
              }}
            >
              <Ionicons name="alert-circle" size={20} color="#DC2626" />
              <Text
                style={{
                  flex: 1,
                  fontSize: 13,
                  color: "#B91C1C",
                  fontWeight: "700",
                }}
              >
                {errorMsg}
              </Text>
            </View>
          )}

          {/* 3. Card-Grouped Form Input */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderRadius: 22,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.borderLight,
              ...Platform.select({
                ios: {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 10,
                },
                android: {
                  elevation: 2,
                },
                web: {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                },
              }),
              gap: 14,
            }}
          >
            {isRegistering && (
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: colors.textPrimary,
                    marginBottom: 6,
                  }}
                >
                  Nama Panggilan / Callsign
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.surfaceSecondary,
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 14,
                    paddingHorizontal: 14,
                    height: 48,
                  }}
                >
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={colors.primary}
                    style={{ marginRight: 10 }}
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: colors.textPrimary,
                      fontWeight: "500",
                    }}
                    placeholder="Contoh: Abex atau Mahasiswa UMM"
                    placeholderTextColor={colors.textMuted}
                    value={callsign}
                    onChangeText={setCallsign}
                    autoCapitalize="words"
                    editable={!loading}
                  />
                </View>
              </View>
            )}

            {/* Input Email */}
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.textPrimary,
                  marginBottom: 6,
                }}
              >
                Alamat Email Mahasiswa
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: colors.surfaceSecondary,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 14,
                  paddingHorizontal: 14,
                  height: 48,
                }}
              >
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={colors.primary}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: colors.textPrimary,
                    fontWeight: "500",
                  }}
                  placeholder="nama@webmail.umm.ac.id"
                  placeholderTextColor={colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

            {/* Input Password */}
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.textPrimary,
                  marginBottom: 6,
                }}
              >
                Kata Sandi
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: colors.surfaceSecondary,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 14,
                  paddingHorizontal: 14,
                  height: 48,
                }}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={colors.primary}
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    color: colors.textPrimary,
                    fontWeight: "500",
                  }}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor={colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

            {/* 4. Full-Pill CTA Button */}
            <Pressable
              onPress={handleAuth}
              disabled={loading}
              style={{
                backgroundColor: loading ? colors.primaryMuted : colors.primary,
                borderRadius: 9999,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 6,
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
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "800",
                    letterSpacing: 0.2,
                  }}
                >
                  {isRegistering ? "Daftar Akun Baru" : "Masuk ke Sistem"}
                </Text>
              )}
            </Pressable>

            {/* 5. Switch Mode Link */}
            <Pressable
              onPress={() => {
                setErrorMsg(null);
                setIsRegistering((prev) => !prev);
              }}
              style={{ paddingVertical: 8, alignItems: "center" }}
            >
              <Text style={{ fontSize: 13, color: colors.textSecondary }}>
                {isRegistering
                  ? "Sudah punya akun? "
                  : "Belum memiliki akun kampus? "}
                <Text style={{ color: colors.primary, fontWeight: "800" }}>
                  {isRegistering ? "Masuk di sini" : "Daftar sekarang"}
                </Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

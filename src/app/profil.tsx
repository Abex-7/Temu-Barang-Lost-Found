import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "../styles/styles";

export default function Profil() {
  const router = useRouter();

  const kembali = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <ScrollView
      style={styles.setProfil}
      contentContainerStyle={styles.profilContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Card Surface */}
      <View style={styles.profilCardSurface}>
        <View style={styles.profilAvatarWrap}>
          <Text style={styles.profilAvatarText}>UM</Text>
        </View>

        <Text style={styles.profilName}>Mahasiswa UMM</Text>
        <Text style={styles.profilSubtitle}>
          NIM: 202210370311xxx · Teknik Informatika
        </Text>

        <View style={styles.profilBadge}>
          <Text style={styles.profilBadgeText}>Kampus 3 UMM Malang</Text>
        </View>
      </View>

      {/* Stats Summary Row */}
      <View style={styles.profilStatsRow}>
        <View style={styles.profilStatItem}>
          <Text style={styles.profilStatNumber}>3</Text>
          <Text style={styles.profilStatLabel}>Dilaporkan</Text>
        </View>
        <View style={styles.profilStatItem}>
          <Text style={styles.profilStatNumber}>2</Text>
          <Text style={styles.profilStatLabel}>Ditemukan</Text>
        </View>
        <View style={styles.profilStatItem}>
          <Text style={styles.profilStatNumber}>5</Text>
          <Text style={styles.profilStatLabel}>Disimpan</Text>
        </View>
      </View>

      {/* Menu Options Section */}
      <View style={styles.profilMenuSection}>
        <Pressable
          style={styles.profilMenuItem}
          android_ripple={{ color: "rgba(88, 24, 37, 0.05)" }}
        >
          <View style={styles.profilMenuLeft}>
            <Ionicons name="document-text-outline" size={20} color={colors.primary} />
            <Text style={styles.profilMenuText}>Riwayat Laporan Saya</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>

        <Pressable
          style={styles.profilMenuItem}
          android_ripple={{ color: "rgba(88, 24, 37, 0.05)" }}
        >
          <View style={styles.profilMenuLeft}>
            <Ionicons name="notifications-outline" size={20} color={colors.primary} />
            <Text style={styles.profilMenuText}>Notifikasi Temuan</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>

        <Pressable
          style={styles.profilMenuItem}
          android_ripple={{ color: "rgba(88, 24, 37, 0.05)" }}
        >
          <View style={styles.profilMenuLeft}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
            <Text style={styles.profilMenuText}>Pusat Bantuan & Keamanan</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>

        <Pressable
          style={[styles.profilMenuItem, { borderBottomWidth: 0 }]}
          android_ripple={{ color: "rgba(88, 24, 37, 0.05)" }}
        >
          <View style={styles.profilMenuLeft}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.profilMenuText}>Tentang Aplikasi Temu Barang</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>

      {/* Back to Home Button */}
      <Pressable
        style={styles.tombolprofil}
        onPress={kembali}
        android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
      >
        <Text style={styles.tombolDetailText}>Kembali ke Beranda</Text>
      </Pressable>
    </ScrollView>
  );
}

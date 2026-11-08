import { StyleSheet, Platform } from "react-native";

// Palet warna resmi Design System Temu Barang (Modern Burgundy System)
export const colors = {
  // 1. Primary Accent: Deep Burgundy / Dark Maroon
  primary: "#581825",
  primaryLight: "#6b1d2f",
  primaryDark: "#3f0f19",
  primaryMuted: "#802336",

  // 2. Background Layar & Surface
  background: "#F8F9FA", // Soft Light Grey
  surface: "#FFFFFF",    // Clean White
  surfaceSecondary: "#F4F5F7",

  // 3. Secondary / Soft Accents: Soft pastel / muted burgundy tint
  secondaryTint: "#FBEAEB",
  secondaryTintBorder: "#F2D6D8",
  secondaryTintDark: "#F2E6E6",

  // 4. Text Colors
  textPrimary: "#1A1A1A",   // Dark Charcoal / Near Black
  textSecondary: "#7A7A7A", // Slate Grey
  textMuted: "#8E8E93",
  textInverted: "#FFFFFF",  // Inverted White

  // 5. Border & Separator
  border: "#E5E7EB",        // Subtle Light Grey
  borderLight: "#EFEFEF",

  // 6. Component-specific
  inputBg: "#F3F4F6",       // Search input background
  tabBarBg: "#581825",      // Bottom navigation bar background
  tabInactive: "rgba(255, 255, 255, 0.6)",
  tabActive: "#FFFFFF",

  // 7. Status Colors
  statusFoundBg: "#FBEAEB",
  statusFoundText: "#581825",
  statusLostBg: "#F2E6E6",
  statusLostText: "#6b1d2f",
  danger: "#E11D48",
};

export const styles = StyleSheet.create({
  // ==========================================
  // ===== 1. LAYAR UTAMA (SCREEN & HEADER) =====
  // ==========================================
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 120,
    height: 48,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -0.5,
  },
  brandBadge: {
    backgroundColor: colors.secondaryTint,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
  },
  brandBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.2,
  },
  headerLocationPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  headerLocationText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 28,
  },

  // ==========================================
  // ===== 2. SEARCH BAR & FILTER BAR =========
  // ==========================================
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 26,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      },
    }),
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
    paddingVertical: 10,
  },
  clearButton: {
    padding: 4,
  },

  // Filter Bar (Tabs: Semua, Dicari, Ditemukan)
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      web: {
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      },
    }),
  },
  tabItemAktif: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 4px 8px rgba(88,24,37,0.25)",
      },
    }),
  },
  tabEmoji: {
    fontSize: 15,
  },
  tabLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  tabLabelAktif: {
    color: colors.textInverted,
    fontWeight: "700",
  },

  // ==========================================
  // ===== 3. SECTION (DAFTAR KELOMPOK) =======
  // ==========================================
  section: {
    marginTop: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionCountBadge: {
    backgroundColor: colors.secondaryTint,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
  },
  sectionCountText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  sectionAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  sectionActionText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  sectionPanah: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "700",
    lineHeight: 18,
  },
  sectionList: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },

  // ==========================================
  // ===== 4. ITEM CARD (BARANG CARD) =========
  // ==========================================
  card: {
    width: 215,
    marginRight: 14,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
      },
    }),
  },
  gambarWrap: {
    width: "100%",
    height: 140,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: colors.surfaceSecondary,
    position: "relative",
  },
  gambar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pill: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: colors.secondaryTint,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  pillText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  hati: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  hatiText: {
    fontSize: 18,
    color: colors.textMuted,
  },
  hatiAktif: {
    color: colors.danger,
  },
  cardContent: {
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 2,
  },
  nama: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  detail: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },

  // ==========================================
  // ===== 5. BOTTOM ACTIONS & NAVBAR =========
  // ==========================================
  bottomNavWrapper: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 20 : 12,
  },
  tombol: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 4,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 12px rgba(88,24,37,0.3)",
      },
    }),
  },
  tombolText: {
    color: colors.textInverted,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: colors.tabBarBg, // Deep Burgundy #581825
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "space-around",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0 4px 14px rgba(88,24,37,0.35)",
      },
    }),
  },
  bottomTabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  bottomTabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.tabInactive, // rgba(255, 255, 255, 0.6)
    marginTop: 3,
  },
  bottomTabLabelAktif: {
    color: colors.tabActive,   // solid white #FFFFFF
    fontWeight: "700",
  },

  // ==========================================
  // ===== 6. DETAIL ITEM SCREEN ==============
  // ==========================================
  detailContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailContent: {
    padding: 20,
    paddingBottom: 40,
  },
  detailHeroContainer: {
    width: "100%",
    height: 270,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      },
    }),
  },
  detailGambar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailHeroBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: colors.secondaryTint,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
  },
  detailCardSurface: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
      },
    }),
  },
  detailNama: {
    fontSize: 23,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.secondaryTint,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  detailKeterangan: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 16,
  },
  detailSeparator: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 14,
  },
  detailSpecsSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  detailSpecsGrid: {
    gap: 10,
  },
  detailSpecCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  detailSpecIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  detailSpecInfo: {
    flex: 1,
  },
  detailSpecLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  detailSpecValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 2,
  },
  detailBaris: {
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 4,
    fontWeight: "500",
  },
  tombolDetail: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 12px rgba(88,24,37,0.3)",
      },
    }),
  },
  tombolDetailText: {
    color: colors.textInverted,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // ==========================================
  // ===== 7. PROFIL SCREEN ===================
  // ==========================================
  setProfil: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profilContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profilCardSurface: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
      },
    }),
  },
  profilAvatarWrap: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  profilAvatarText: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.primary,
  },
  profilName: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  profilSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  profilBadge: {
    backgroundColor: colors.secondaryTint,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
    marginTop: 10,
  },
  profilBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  profilStatsRow: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginTop: 16,
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
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      },
    }),
  },
  profilStatItem: {
    alignItems: "center",
    flex: 1,
  },
  profilStatNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
  },
  profilStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
    fontWeight: "500",
  },
  profilMenuSection: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: "hidden",
  },
  profilMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    justifyContent: "space-between",
  },
  profilMenuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profilMenuText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  tombolprofil: {
    backgroundColor: colors.primary,
    borderRadius: 26,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 12px rgba(88,24,37,0.3)",
      },
    }),
  },

  // ==========================================
  // ===== 8. EMPTY, LOADING, ERROR ===========
  // ==========================================
  kosong: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  emptyIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

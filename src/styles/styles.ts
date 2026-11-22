import { StyleSheet, Platform } from "react-native";

// ============================================================================
// PALET WARNA RESMI DESIGN SYSTEM TEMU BARANG (MODERN BURGUNDY SYSTEM)
// ============================================================================
export const colors = {
  // 1. Primary Accent: Deep Burgundy / Dark Maroon (DoorDash bold accent equivalent)
  primary: "#581825",
  primaryLight: "#6b1d2f",
  primaryDark: "#3f0f19",
  primaryMuted: "#802336",

  // 2. Background Layar & Surface (Ultra-clean modern iOS style)
  background: "#F8F9FA", // Soft light canvas
  surface: "#FFFFFF",    // Pure white surface
  surfaceSecondary: "#F4F5F7",

  // 3. Secondary / Soft Accents: Soft pastel burgundy tint
  secondaryTint: "#FBEAEB",
  secondaryTintBorder: "#F2D6D8",
  secondaryTintDark: "#F2E6E6",

  // 4. Text Colors
  textPrimary: "#111827",   // Dark Charcoal / Near Black (Prism system)
  textSecondary: "#6B7280", // Slate Grey / Muted metadata
  textMuted: "#9CA3AF",     // Light placeholder
  textInverted: "#FFFFFF",  // Inverted White

  // 5. Border & Separator
  border: "#E5E7EB",        // Subtle Light Grey
  borderLight: "#F3F4F6",

  // 6. Component-specific
  inputBg: "#F3F4F6",       // DoorDash search input background
  tabBarBg: "#581825",      // Bottom navigation bar background
  tabInactive: "rgba(255, 255, 255, 0.6)",
  tabActive: "#FFFFFF",

  // 7. Status Colors (Lost & Found badge tokens)
  statusFoundBg: "#ECFDF5",   // Soft emerald tint for Found
  statusFoundText: "#059669", // Vibrant green text
  statusFoundBorder: "#A7F3D0",
  statusLostBg: "#FEF2F2",    // Soft rose tint for Lost
  statusLostText: "#DC2626",  // Vibrant red text
  statusLostBorder: "#FECACA",

  // 8. Functional
  danger: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
};

// ============================================================================
// STYLESHEET TERCIPTA BERDASARKAN POLA UI/UX DOORDASH IOS (MOBBIN)
// ============================================================================
export const styles = StyleSheet.create({
  // ==========================================
  // ===== 1. LAYAR UTAMA (SCREEN & HEADER) =====
  // ==========================================
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 18,
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
  },
  logo: {
    width: 130,
    height: 44,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: -0.5,
  },
  brandBadge: {
    backgroundColor: colors.secondaryTint,
    paddingHorizontal: 9,
    paddingVertical: 2.5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
  },
  brandBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5,
  },
  headerLocationPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 5,
  },
  headerLocationText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
    maxWidth: 130,
  },
  headerProfileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  // ==========================================
  // ===== 2. SEARCH BAR & FILTER PILLS =======
  // ==========================================
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 9999, // DoorDash full-pill shape
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "transparent",
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
    marginRight: 6,
  },
  searchFilterButton: {
    padding: 6,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },

  // Category Carousel (DoorDash Horizontal Pills)
  categoryCarousel: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  categoryChipTextActive: {
    color: colors.textInverted,
    fontWeight: "700",
  },

  // Filter Bar (Tabs: Semua, Dicari, Ditemukan)
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 9999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 5,
  },
  tabItemAktif: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabEmoji: {
    fontSize: 13,
  },
  tabLabel: {
    fontSize: 12,
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
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: -0.4,
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
    fontWeight: "700",
    color: colors.primary,
  },
  sectionPanah: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "700",
  },
  sectionList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  // ==========================================
  // ===== 4. ITEM CARD (DOORDASH CARD STYLE) =
  // ==========================================
  card: {
    width: 240,
    marginRight: 14,
    backgroundColor: colors.surface,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
      },
    }),
  },
  gambarWrap: {
    width: "100%",
    height: 145, // 16:9 modern proportion
    backgroundColor: colors.surfaceSecondary,
    position: "relative",
    overflow: "hidden",
  },
  gambar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  // Floating pill status overlay
  pill: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
    gap: 4,
  },
  pillFound: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.statusFoundBorder,
  },
  pillLost: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.statusLostBorder,
  },
  pillText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  pillTextFound: {
    color: colors.statusFoundText,
  },
  pillTextLost: {
    color: colors.statusLostText,
  },
  // Floating bookmark heart button
  hati: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    padding: 12,
  },
  nama: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
    lineHeight: 20,
    marginBottom: 4,
  },
  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detail: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500",
    flex: 1,
  },
  metaDot: {
    fontSize: 12,
    color: colors.textMuted,
  },

  // ==========================================
  // ===== 5. BOTTOM NAVIGATION & ACTION BAR ==
  // ==========================================
  bottomNavWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 22 : 12,
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 -4px 12px rgba(0,0,0,0.06)",
      },
    }),
  },
  tombol: {
    backgroundColor: colors.primary,
    borderRadius: 9999, // DoorDash signature pill action button
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 3px 8px rgba(88,24,37,0.3)",
      },
    }),
  },
  tombolText: {
    color: colors.textInverted,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  bottomTabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 4,
  },
  bottomTabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  bottomTabLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: 2,
  },
  bottomTabLabelAktif: {
    color: colors.primary,
    fontWeight: "800",
  },

  // ==========================================
  // ===== 6. DETAIL SCREEN (HERO & SHEET) ====
  // ==========================================
  detailContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  detailContent: {
    paddingBottom: 110,
  },
  detailHeroContainer: {
    width: "100%",
    height: 300,
    backgroundColor: colors.surfaceSecondary,
    position: "relative",
  },
  detailGambar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailFloatingTopBar: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailCircleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  detailHeroBadge: {
    position: "absolute",
    bottom: 34,
    left: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  detailSheetCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -22,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 -3px 12px rgba(0,0,0,0.04)",
      },
    }),
  },
  detailNama: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  detailTagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 9999,
    backgroundColor: colors.secondaryTint,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.primary,
  },
  detailKeterangan: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  detailSeparator: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 18,
  },
  detailSpecsSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  detailSpecsGrid: {
    gap: 10,
  },
  detailSpecCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 14,
  },
  detailSpecIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  detailSpecInfo: {
    flex: 1,
  },
  detailSpecLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  detailSpecValue: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 2,
  },
  detailStickyBottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: "0 -4px 12px rgba(0,0,0,0.06)",
      },
    }),
  },
  tombolDetail: {
    backgroundColor: colors.primary,
    borderRadius: 9999,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  tombolDetailText: {
    color: colors.textInverted,
    fontSize: 15,
    fontWeight: "800",
  },

  // ==========================================
  // ===== 7. PROFIL SCREEN ===================
  // ==========================================
  setProfil: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profilContent: {
    padding: 18,
    paddingBottom: 40,
  },
  profilCardSurface: {
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.primary,
    marginBottom: 12,
  },
  profilAvatarText: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.primary,
  },
  profilName: {
    fontSize: 20,
    fontWeight: "900",
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
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.secondaryTintBorder,
    marginTop: 10,
  },
  profilBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.primary,
  },
  profilStatsRow: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 20,
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
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary,
  },
  profilStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
    fontWeight: "600",
  },
  profilMenuSection: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: "hidden",
  },
  profilMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    justifyContent: "space-between",
  },
  profilMenuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  profilMenuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
  },
  profilMenuText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  tombolprofil: {
    backgroundColor: colors.primary,
    borderRadius: 9999,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 12px rgba(88,24,37,0.25)",
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
    borderRadius: 22,
    marginHorizontal: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondaryTint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});

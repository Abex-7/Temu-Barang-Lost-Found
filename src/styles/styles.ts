import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ===== Layar utama =====
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  logo: {
    width: 140,
    height: 70,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  kosong: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 16,
    marginTop: 32,
  },
  tombol: {
    backgroundColor: "#16a322",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  tombolText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ===== SearchBar (pill, teks di tengah) =====
  searchContainer: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 999,
    marginHorizontal: 16,
    marginTop: 4,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  searchIcon: {
    position: "absolute",
    left: 20,
  },
  searchInput: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    paddingVertical: 16,
    paddingHorizontal: 48,
  },

  // ===== Tab =====
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tabItem: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabItemAktif: {
    borderBottomColor: "#0f172a",
  },
  tabEmoji: {
    fontSize: 28,
  },
  tabLabel: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
  },
  tabLabelAktif: {
    color: "#0f172a",
    fontWeight: "bold",
  },

  // ===== Section =====
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
  },
  sectionPanah: {
    fontSize: 26,
    color: "#0f172a",
    marginLeft: 6,
  },
  sectionList: {
    paddingHorizontal: 16,
  },

  // ===== BarangCard (vertikal) =====
  card: {
    width: 200,
    marginRight: 14,
  },
  gambarWrap: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#e2e8f0",
  },
  gambar: {
    width: "100%",
    height: "100%",
  },
  pill: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#ffffff",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  hati: {
    position: "absolute",
    top: 4,
    right: 10,
  },
  hatiText: {
    fontSize: 30,
    color: "#ffffff",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowRadius: 4,
  },
  hatiAktif: {
    color: "#ef4444",
  },
  nama: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },

  // ===== Badge (dipakai halaman detail) =====
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },

  // ===== Halaman Detail =====
  detailContainer: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  detailContent: {
    padding: 16,
  },
  detailGambar: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#e2e8f0",
    marginBottom: 16,
  },
  detailNama: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  detailKeterangan: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 12,
    marginBottom: 16,
  },
  detailBaris: {
    fontSize: 16,
    color: "#0f172a",
    marginBottom: 4,
  },
  tombolDetail: {
    backgroundColor: "#16a322",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  tombolDetailText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // ===== SearchBar =====
  searchContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
    paddingVertical: 10,
  },

  // ===== BarangCard =====
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
  },
  gambar: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: "#e2e8f0",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  nama: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: "#64748b",
  },
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
});
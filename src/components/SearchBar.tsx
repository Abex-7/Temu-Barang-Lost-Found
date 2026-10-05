import { View, TextInput } from "react-native";
import { styles } from "../styles/styles";

// Search bar hanya tampilan (belum berfungsi, menunggu materi state)
export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="Cari barang..." style={styles.searchInput} />
    </View>
  );
}
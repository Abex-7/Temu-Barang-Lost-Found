import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color="#0f172a"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Cari barang..."
        placeholderTextColor="#0f172a"
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
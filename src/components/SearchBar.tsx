import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "../styles/styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={19}
        color={colors.primary}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Cari barang hilang atau ditemukan..."
        placeholderTextColor={colors.textMuted}
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable
          style={styles.clearButton}
          onPress={() => onChangeText("")}
          hitSlop={8}
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.textSecondary}
          />
        </Pressable>
      )}
    </View>
  );
}

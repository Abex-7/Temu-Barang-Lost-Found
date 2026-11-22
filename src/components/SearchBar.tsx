import React from "react";
import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "../styles/styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

/**
 * SearchBar bergaya DoorDash iOS:
 * - Bentuk Full-Pill (borderRadius 9999px)
 * - Background abu-abu lembut (#F3F4F6) tanpa border kaku
 * - Ikon search di kiri, tombol clear dinamis, dan tuner filter di kanan
 */
export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
}: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={18}
        color={colors.textSecondary}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Cari barang hilang, kunci, dompet..."
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

      {onFilterPress && (
        <Pressable
          style={styles.searchFilterButton}
          onPress={onFilterPress}
          hitSlop={8}
        >
          <Ionicons name="options-outline" size={17} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}

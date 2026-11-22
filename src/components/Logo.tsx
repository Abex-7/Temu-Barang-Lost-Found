import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/styles";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  size?: "small" | "medium" | "large";
}

/**
 * Komponen Logo Resmi Temu Barang
 * Menampilkan simbol Kaca Pembesar & Pin Lokasi dengan tipografi bersih TEMU BARANG.
 */
export default function Logo({ variant = "full", size = "medium" }: LogoProps) {
  const iconSize = size === "small" ? 36 : size === "large" ? 56 : 42;
  const pinIconSize = size === "small" ? 18 : size === "large" ? 28 : 22;

  const renderIconMark = () => (
    <View
      style={[
        styles.iconContainer,
        {
          width: iconSize,
          height: iconSize,
          borderRadius: iconSize * 0.28,
        },
      ]}
    >
      <View style={styles.iconInner}>
        <Ionicons name="location" size={pinIconSize} color="#FFFFFF" />
        <View style={styles.searchAccentWrap}>
          <Ionicons
            name="search"
            size={pinIconSize * 0.65}
            color={colors.primary}
          />
        </View>
      </View>
    </View>
  );

  if (variant === "icon") {
    return renderIconMark();
  }

  const titleFontSize = size === "small" ? 18 : size === "large" ? 26 : 22;

  return (
    <View style={styles.container}>
      {renderIconMark()}

      <View style={styles.textWrap}>
        <Text style={[styles.titleMain, { fontSize: titleFontSize }]}>
          TEMU<Text style={styles.titleDark}>BARANG</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(251, 234, 235, 0.4)",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 3,
  },
  iconInner: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  searchAccentWrap: {
    position: "absolute",
    top: -2,
    right: -4,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  textWrap: {
    justifyContent: "center",
  },
  titleMain: {
    fontWeight: "900",
    color: colors.primary,
    letterSpacing: -0.6,
  },
  titleDark: {
    color: colors.primaryDark,
    fontWeight: "800",
  },
});

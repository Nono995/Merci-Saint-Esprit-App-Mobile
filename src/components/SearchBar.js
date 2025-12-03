import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants/theme';

const SearchBar = ({
  placeholder = 'Rechercher...',
  value,
  onChangeText,
  onFilterPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.textTertiary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textTertiary}
          value={value}
          onChangeText={onChangeText}
        />
      </View>

      {/* Filter Button */}
      {onFilterPress && (
        <TouchableOpacity
          onPress={onFilterPress}
          style={styles.filterButton}
          activeOpacity={0.7}
        >
          <Ionicons name="options-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.base,
    paddingHorizontal: SPACING.base,
    height: 48,
    ...SHADOWS.xs,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    padding: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.base,
    backgroundColor: COLORS.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.xs,
  },
});

export default SearchBar;

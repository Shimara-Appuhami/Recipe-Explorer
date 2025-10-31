import RecipeCard from "@/components/RecipeCard";
import {
  BorderRadius,
  Colors,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useFavorites } from "@/context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FavoritesScreen() {
  const { favorites, removeFavorite, loading } = useFavorites();
  const [searchQuery, setSearchQuery] = useState("");

  // filter favorites based on search query
  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) {
      return favorites;
    }
    const query = searchQuery.toLowerCase();
    return favorites.filter((recipe) => {
      const name = recipe.strMeal.toLowerCase();
      const category =
        "strCategory" in recipe ? recipe.strCategory.toLowerCase() : "";
      return name.includes(query) || category.includes(query);
    });
  }, [favorites, searchQuery]);

  // calculate stats from favorites
  const stats = useMemo(() => {
    const categories = new Set(
      favorites.map((recipe) =>
        "strCategory" in recipe ? recipe.strCategory : ""
      )
    );
    return {
      total: favorites.length,
      categories: categories.size,
      recent: favorites.slice(0, 3).length,
    };
  }, [favorites]);

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  const handleRemoveFavorite = async (recipeId: string) => {
    try {
      await removeFavorite(recipeId);
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modern Header */}
      <View style={styles.header}>
        {/* Heart Badge and Title on same line */}
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Saved Recipes</Text>
            <Text style={styles.headerSubtitle}>
              Your collection of favorites
            </Text>
          </View>
          <View style={styles.heartBadge}>
            <Ionicons name="heart" size={20} color={Colors.textWhite} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search favorites..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={styles.statCardHorizontal}>
            <View style={styles.statLeftSection}>
              <View style={styles.statIconBadge}>
                <Ionicons name="restaurant" size={24} color="#FF6B6B" />
              </View>
            </View>
            <View style={styles.statRightSection}>
              <Text style={styles.statLabelTop}>Total</Text>
              <Text style={styles.statNumberLarge}>{stats.total}</Text>
              <Text style={styles.statLabelBottom}>Saved Recipes</Text>
            </View>
          </View>

          <View style={styles.statsSmallRow}>
            <View style={styles.statCardSmall}>
              <Ionicons name="grid-outline" size={20} color="#4ECDC4" />
              <Text style={styles.statNumberSmall}>{stats.categories}</Text>
              <Text style={styles.statLabelSmall}>Categories</Text>
            </View>

            <View style={styles.statCardSmall}>
              <Ionicons name="heart" size={20} color="#FF6B6B" />
              <Text style={styles.statNumberSmall}>
                {stats.total > 0 ? "100%" : "0%"}
              </Text>
              <Text style={styles.statLabelSmall}>Loved</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Favorites List */}
      {filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          {searchQuery.trim() ? (
            <>
              <View style={styles.emptyIconCircle}>
                <Ionicons
                  name="search-outline"
                  size={48}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.emptyTitle}>No recipes found</Text>
              <Text style={styles.emptyText}>
                Try searching with different keywords
              </Text>
            </>
          ) : (
            <>
              <View style={styles.emptyIconCircle}>
                <Ionicons
                  name="heart-outline"
                  size={48}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptyText}>
                Start exploring and tap the heart icon to save your favorite
                recipes!
              </Text>
            </>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => handleRecipePress(item.idMeal)}
              isFavorite={true}
              onToggleFavorite={() => handleRemoveFavorite(item.idMeal)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: "transparent",
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  heartBadge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.medium,
  },
  statsContainer: {
    marginHorizontal: -Spacing.lg,
  },
  statsContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  statsGrid: {
    gap: Spacing.sm,
  },
  statCardHorizontal: {
    flexDirection: "row",
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    ...Shadows.medium,
    marginBottom: Spacing.sm,
  },
  statLeftSection: {
    width: 80,
    backgroundColor: "#FFF5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  statIconBadge: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.textWhite,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.small,
  },
  statRightSection: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "center",
  },
  statLabelTop: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statNumberLarge: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  statLabelBottom: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  statsSmallRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  statCardSmall: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    ...Shadows.small,
  },
  statNumberSmall: {
    fontSize: FontSizes.xl,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginVertical: Spacing.xs,
  },
  statLabelSmall: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.textLight,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  topText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: "500",
    marginBottom: Spacing.sm,
  },
  statCard: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    minWidth: 120,
    position: "relative",
    ...Shadows.medium,
  },
  statCardPrimary: {
    backgroundColor: "#FF6B6B",
  },
  statCardSecondary: {
    backgroundColor: "#4ECDC4",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  statIconContainerNew: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  statIconContainerAccent: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  statTextContainer: {
    flex: 1,
  },
  statNumberNew: {
    fontSize: 32,
    fontWeight: "900",
    color: Colors.textWhite,
    marginBottom: 4,
  },
  statLabelNew: {
    fontSize: FontSizes.sm,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.sm,
  },
  statNumber: {
    fontSize: FontSizes.xxl,
    fontWeight: "800",
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  listContent: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  row: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
  },
});

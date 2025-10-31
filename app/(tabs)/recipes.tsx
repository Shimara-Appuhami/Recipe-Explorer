import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import RecipeCard from "@/components/RecipeCard";
import { BorderRadius, Colors, FontSizes, Spacing } from "@/constants/theme";
import { useFavorites } from "@/context/FavoritesContext";
import {
  getCategories,
  getMultipleRandomRecipes,
  getRecipesByCategory,
  searchRecipes,
} from "@/services/api";
import { Category, Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecipesScreen() {
  const params = useLocalSearchParams();
  const initialCategory = params.category as string | undefined;

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (initialCategory && initialCategory !== "All") {
      handleCategorySelect(initialCategory);
    }
  }, [initialCategory]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load categories
      const categoriesData = await getCategories();
      setCategories(categoriesData);

      // Load random recipes if no initial category
      if (!initialCategory) {
        const recipesData = await getMultipleRandomRecipes(10);
        setRecipes(recipesData);
      }
    } catch (err) {
      setError("Failed to load recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadInitialData();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchRecipes(searchQuery);
      setRecipes(results);
      setSelectedCategory("All");
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");

    if (category === "All") {
      loadInitialData();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const recipeList = await getRecipesByCategory(category);

      const detailedRecipes = await Promise.all(
        recipeList.slice(0, 10).map(async (item) => {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.idMeal}`
          );
          const data = await response.json();
          return data.meals[0];
        })
      );

      setRecipes(detailedRecipes);
    } catch (err) {
      setError("Failed to load category recipes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (recipe: Recipe) => {
    try {
      if (isFavorite(recipe.idMeal)) {
        await removeFavorite(recipe.idMeal);
      } else {
        await addFavorite(recipe);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}` as any);
  };

  if (loading && recipes.length === 0) {
    return <LoadingSpinner message="Loading delicious recipes..." />;
  }

  if (error && recipes.length === 0) {
    return <ErrorMessage message={error} onRetry={loadInitialData} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Find your food</Text>
          </View>
        </View>

        {/* search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.textSecondary}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Food"
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                loadInitialData();
              }}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={!searchQuery.trim()}
          >
            <Ionicons name="search" size={20} color={Colors.textWhite} />
          </TouchableOpacity>
        </View>

        {/* categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleCategorySelect("All")}
          >
            <View
              style={[
                styles.categoryImageContainer,
                selectedCategory === "All" && styles.categoryImageActive,
              ]}
            >
              <Ionicons
                name="apps"
                size={32}
                color={
                  selectedCategory === "All" ? Colors.textWhite : Colors.primary
                }
              />
            </View>
            <Text
              style={[
                styles.categoryLabel,
                selectedCategory === "All" && styles.categoryLabelActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {categories.slice(0, 8).map((category) => (
            <TouchableOpacity
              key={category.idCategory}
              style={styles.categoryItem}
              onPress={() => handleCategorySelect(category.strCategory)}
            >
              <View
                style={[
                  styles.categoryImageContainer,
                  selectedCategory === category.strCategory &&
                    styles.categoryImageActive,
                ]}
              >
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === category.strCategory &&
                    styles.categoryLabelActive,
                ]}
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recipe Grid */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => handleRecipePress(item.idMeal)}
            isFavorite={isFavorite(item.idMeal)}
            onToggleFavorite={() => handleToggleFavorite(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="restaurant-outline"
              size={64}
              color={Colors.textLight}
            />
            <Text style={styles.emptyText}>No recipes found</Text>
            <Text style={styles.emptySubtext}>
              Try a different search or category
            </Text>
          </View>
        }
      />
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
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
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
  searchButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    marginHorizontal: -Spacing.md,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  categoryImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: "hidden",
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xs,
    borderWidth: 3,
    borderColor: "transparent",
  },
  categoryImageActive: {
    borderColor: Colors.primary,
  },
  categoryImage: {
    width: "100%",
    height: "100%",
  },
  categoryLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textPrimary,
    fontWeight: "500",
    textAlign: "center",
  },
  categoryLabelActive: {
    color: Colors.primary,
    fontWeight: "700",
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    marginRight: Spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: Colors.textWhite,
    fontWeight: "600",
  },
  listContent: {
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  row: {
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});

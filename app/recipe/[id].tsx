import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  BorderRadius,
  Colors,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { useFavorites } from "@/context/FavoritesContext";
import { getRecipeById } from "@/services/api";
import { Ingredient, Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function RecipeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRecipeById(id as string);
      setRecipe(data);
    } catch (err) {
      setError("Failed to load recipe details.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (recipe: Recipe): Ingredient[] => {
    const ingredients: Ingredient[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && ingredient.trim()) {
        ingredients.push({
          name: ingredient,
          measure: measure || "",
        });
      }
    }

    return ingredients;
  };

  const getInstructionSteps = (instructions: string): string[] => {
    let steps = instructions
      .split(/(?:STEP \d+|Step \d+|\r\n\r\n|\n\n)/)
      .filter((step) => step.trim().length > 0);

    if (steps.length === 1) {
      steps = instructions
        .split(/\r\n|\n/)
        .filter((step) => step.trim().length > 0);
    }

    if (steps.length === 1) {
      const numberedSteps = instructions.split(/(?=\d+[\.)]\s+)/);
      if (numberedSteps.length > 1) {
        steps = numberedSteps
          .map((step) => step.replace(/^\d+[\.)]\s+/, "").trim())
          .filter((step) => step.length > 10);
      } else {
        steps = instructions
          .split(/\.\s+/)
          .filter((step) => step.trim().length > 10)
          .map((step) => step.trim() + (step.endsWith(".") ? "" : "."));
      }
    }

    return steps.map((step) => step.trim());
  };

  const handleWatchVideo = async () => {
    if (!recipe?.strYoutube) return;

    try {
      const supported = await Linking.canOpenURL(recipe.strYoutube);
      if (supported) {
        await Linking.openURL(recipe.strYoutube);
      } else {
        console.error("Cannot open URL:", recipe.strYoutube);
      }
    } catch (error) {
      console.error("Error opening video:", error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!recipe) return;

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

  if (loading) {
    return <LoadingSpinner message="Loading recipe..." />;
  }

  if (error || !recipe) {
    return (
      <ErrorMessage
        message={error || "Recipe not found"}
        onRetry={loadRecipe}
      />
    );
  }

  const ingredients = getIngredients(recipe);
  const instructionSteps = getInstructionSteps(recipe.strInstructions);
  const favorite = isFavorite(recipe.idMeal);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
            activeOpacity={0.8}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={28}
              color={favorite ? Colors.accent : Colors.textWhite}
            />
          </TouchableOpacity>
        </View>

        {/* recipe Info */}
        <View style={styles.content}>
          {/* title */}
          <Text style={styles.title}>{recipe.strMeal}</Text>

          {/* tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Ionicons
                name="restaurant-outline"
                size={16}
                color={Colors.primary}
              />
              <Text style={styles.tagText}>{recipe.strCategory}</Text>
            </View>

            <View style={styles.tag}>
              <Ionicons name="earth-outline" size={16} color={Colors.primary} />
              <Text style={styles.tagText}>{recipe.strArea}</Text>
            </View>

            {recipe.strTags && (
              <View style={styles.tag}>
                <Ionicons
                  name="pricetag-outline"
                  size={16}
                  color={Colors.primary}
                />
                <Text style={styles.tagText}>
                  {recipe.strTags.split(",")[0]}
                </Text>
              </View>
            )}
          </View>

          {/* ingredients Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.ingredientBullet} />
                  <Text style={styles.ingredientText}>
                    <Text style={styles.ingredientMeasure}>
                      {ingredient.measure}{" "}
                    </Text>
                    {ingredient.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* instructions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <View style={styles.instructionsContainer}>
              {instructionSteps.map((step, index) => (
                <View key={index} style={styles.instructionStep}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>

          {recipe.strYoutube && (
            <TouchableOpacity
              style={styles.videoButton}
              onPress={handleWatchVideo}
            >
              <Ionicons
                name="play-circle-outline"
                size={24}
                color={Colors.textWhite}
              />
              <Text style={styles.videoButtonText}>Watch Video Tutorial</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: width,
    height: width * 0.75,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: Spacing.lg,
    left: Spacing.md,
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.full,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.medium,
  },
  favoriteButton: {
    position: "absolute",
    top: Spacing.lg,
    right: Spacing.md,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: BorderRadius.full,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.primaryLight + "20",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  tagText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: "600",
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  ingredientsContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
  },
  ingredientBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 7,
    marginRight: Spacing.sm,
  },
  ingredientText: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  ingredientMeasure: {
    fontWeight: "600",
    color: Colors.primary,
  },
  instructionsContainer: {
    gap: Spacing.md,
  },
  instructionStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  stepNumberText: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    color: Colors.textWhite,
  },
  stepText: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  instructions: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 24,
    textAlign: "justify",
  },
  videoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
    ...Shadows.medium,
  },
  videoButtonText: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.textWhite,
  },
});

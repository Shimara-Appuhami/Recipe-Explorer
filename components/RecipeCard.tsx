import {
  BorderRadius,
  Colors,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Recipe, RecipeListItem } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RecipeCardProps {
  recipe: Recipe | RecipeListItem;
  onPress: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showFavoriteButton?: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - Spacing.md * 3) / 2;

export default function RecipeCard({
  recipe,
  onPress,
  isFavorite = false,
  onToggleFavorite,
  showFavoriteButton = true,
}: RecipeCardProps) {
  const category = "strCategory" in recipe ? recipe.strCategory : "";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.card}>
        {/* Recipe Image with Gradient Overlay */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Dark gradient overlay for text readability */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={styles.gradient}
          />

          {/* Favorite Button - Bottom Right */}
          {showFavoriteButton && onToggleFavorite && (
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={22}
                color={isFavorite ? Colors.accent : Colors.textWhite}
              />
            </TouchableOpacity>
          )}

          {/* Category Badge - Top Left */}
          {category && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}

          {/* Recipe Info Overlay */}
          <View style={styles.infoOverlay}>
            <Text style={styles.title} numberOfLines={2}>
              {recipe.strMeal}
            </Text>

            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={Colors.textWhite}
                />
                <Text style={styles.metaText}>30 min</Text>
              </View>
              <View style={styles.metaDivider} />
              <View style={styles.metaItem}>
                <Ionicons
                  name="flame-outline"
                  size={14}
                  color={Colors.textWhite}
                />
                <Text style={styles.metaText}>Easy</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    ...Shadows.large,
  },
  imageContainer: {
    width: "100%",
    height: CARD_WIDTH * 1.3,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
  },
  favoriteButton: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.medium,
  },
  categoryBadge: {
    position: "absolute",
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: "rgba(95, 182, 72, 0.95)",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    fontSize: FontSizes.xs,
    color: Colors.textWhite,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: "700",
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: FontSizes.xs,
    color: Colors.textWhite,
    fontWeight: "500",
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});

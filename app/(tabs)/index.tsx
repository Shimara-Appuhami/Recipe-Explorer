import {
  BorderRadius,
  Colors,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface Category {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  route: string;
  icon: string;
}

const categories: Category[] = [
  {
    id: "1",
    title: "Breakfast",
    subtitle: "Morning delights to energize",
    image: "https://www.themealdb.com/images/media/meals/kcv6hj1598733479.jpg",
    route: "Breakfast",
    icon: "sunny",
  },
  {
    id: "2",
    title: "Dinner",
    subtitle: "Hearty meals for the evening",
    image: "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
    route: "Beef",
    icon: "restaurant",
  },
  {
    id: "3",
    title: "Sweets",
    subtitle: "Indulge in sweet perfection",
    image: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
    route: "Dessert",
    icon: "ice-cream",
  },
  {
    id: "4",
    title: "Pasta",
    subtitle: "Italian classics & more",
    image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    route: "Pasta",
    icon: "nutrition",
  },
  {
    id: "5",
    title: "Seafood",
    subtitle: "Fresh from the ocean",
    image: "https://www.themealdb.com/images/media/meals/1548772327.jpg",
    route: "Seafood",
    icon: "fish",
  },
];

export default function HomeTab() {
  const handleCategoryPress = (category: Category) => {
    router.push({
      pathname: "/(tabs)/recipes",
      params: { category: category.route },
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* featured Category */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() => handleCategoryPress(categories[0])}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: categories[0].image }}
              style={styles.featuredImage}
              resizeMode="cover"
            />
            <View style={styles.featuredOverlay} />
            <View style={styles.featuredContent}>
              <View style={styles.featuredBadge}>
                <Ionicons
                  name={categories[0].icon as any}
                  size={20}
                  color={Colors.primary}
                />
                <Text style={styles.featuredBadgeText}>Popular</Text>
              </View>
              <Text style={styles.featuredTitle}>{categories[0].title}</Text>
              <Text style={styles.featuredSubtitle}>
                {categories[0].subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Grid Categories */}
        <View style={styles.gridSection}>
          <Text style={styles.sectionTitle}>More Categories</Text>
          <View style={styles.grid}>
            {categories.slice(1).map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.gridCard}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.9}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
                <View style={styles.gridOverlay} />
                <View style={styles.gridContent}>
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={category.icon as any}
                      size={28}
                      color={Colors.textWhite}
                    />
                  </View>
                  <Text style={styles.gridTitle}>{category.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.cardBackground,
    ...Shadows.small,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    width: 24,
    gap: 4,
  },
  menuLine: {
    height: 3,
    backgroundColor: Colors.textPrimary,
    borderRadius: 2,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  appTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  locationText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  searchButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  profileButton: {
    position: "relative",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.cardBackground,
  },
  greeting: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  featuredSection: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  featuredCard: {
    height: 220,
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    ...Shadows.large,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  featuredContent: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: "flex-end",
  },
  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: "flex-start",
    marginBottom: Spacing.md,
  },
  featuredBadgeText: {
    fontSize: FontSizes.sm,
    fontWeight: "600",
    color: Colors.primary,
  },
  featuredTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: "700",
    color: Colors.textWhite,
    marginBottom: Spacing.xs,
  },
  featuredSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textWhite,
    opacity: 0.9,
  },
  gridSection: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  gridCard: {
    width: (width - Spacing.lg * 2 - Spacing.md) / 2,
    height: 160,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    ...Shadows.medium,
  },
  gridImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  gridContent: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  gridTitle: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: Colors.textWhite,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

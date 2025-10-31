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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <View style={styles.plateCircle}>
              <Image
                source={{
                  uri: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
                }}
                style={styles.foodImage}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={styles.decorativeIcon1}>
            <Ionicons name="restaurant" size={32} color={Colors.primary} />
          </View>
          <View style={styles.decorativeIcon2}>
            <Ionicons name="heart" size={28} color={Colors.accent} />
          </View>
          <View style={styles.decorativeIcon3}>
            <Ionicons name="book" size={30} color={Colors.warning} />
          </View>
        </View>

        <Text style={styles.title}>Discover Amazing{"\n"}Recipes</Text>

        <Text style={styles.subtitle}>
          Explore thousands of delicious recipes{"\n"}from around the world
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
  },
  illustrationContainer: {
    marginBottom: Spacing.xxl,
    position: "relative",
  },
  illustrationCircle: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: (width * 0.65) / 2,
    backgroundColor: Colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.large,
    padding: Spacing.md,
  },
  plateCircle: {
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: (width * 0.55) / 2,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: Colors.primaryLight,
  },
  foodImage: {
    width: "100%",
    height: "100%",
  },
  decorativeIcon1: {
    position: "absolute",
    top: -10,
    right: 20,
    backgroundColor: Colors.cardBackground,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.medium,
  },
  decorativeIcon2: {
    position: "absolute",
    bottom: 30,
    left: -10,
    backgroundColor: Colors.cardBackground,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.medium,
  },
  decorativeIcon3: {
    position: "absolute",
    top: 40,
    left: -15,
    backgroundColor: Colors.cardBackground,
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.medium,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "700",
    color: Colors.textWhite,
    textAlign: "center",
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textWhite,
    textAlign: "center",
    opacity: 0.95,
    marginBottom: Spacing.xxl,
    lineHeight: 24,
  },
  button: {
    width: "100%",
    backgroundColor: Colors.cardBackground,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.full,
    alignItems: "center",
    marginTop: Spacing.xl,
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
    ...Shadows.large,
  },
  buttonText: {
    fontSize: FontSizes.xl,
    fontWeight: "700",
    color: Colors.primary,
  },
});

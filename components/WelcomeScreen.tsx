import {
  BorderRadius,
  Colors,
  FontSizes,
  Shadows,
  Spacing,
} from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Illustration Circle */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationCircle}>
            <Ionicons name="restaurant" size={120} color={Colors.primary} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Fast delivery at{"\n"}your doorstep</Text>
        <Text style={styles.subtitle}>
          Home delivery and online reservation{"\n"}system for restaurants &
          cafe
        </Text>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Ionicons name="search" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Search 1000s of recipes</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="heart" size={24} color={Colors.accent} />
            <Text style={styles.featureText}>Save your favorites</Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="book" size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Detailed instructions</Text>
          </View>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={onGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Let's Explore</Text>
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
  },
  illustrationCircle: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: Colors.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    ...Shadows.large,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: "700",
    color: Colors.textWhite,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: Colors.textWhite,
    textAlign: "center",
    opacity: 0.9,
    marginBottom: Spacing.xl,
  },
  features: {
    width: "100%",
    marginBottom: Spacing.xxl,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.md,
    color: Colors.textWhite,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    backgroundColor: Colors.cardBackground,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    ...Shadows.medium,
  },
  buttonText: {
    fontSize: FontSizes.lg,
    fontWeight: "700",
    color: Colors.primary,
  },
});

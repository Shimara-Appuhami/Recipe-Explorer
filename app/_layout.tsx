import { FavoritesProvider } from "@/context/FavoritesContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "welcome",
};

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="recipe/[id]"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </FavoritesProvider>
  );
}

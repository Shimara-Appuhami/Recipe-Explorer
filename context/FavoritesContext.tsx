/**
 * Favorites Context
 * Manages favorite recipes using React Context API and AsyncStorage
 */

import { Recipe } from "@/types/recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FavoritesContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => Promise<void>;
  removeFavorite: (recipeId: string) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_STORAGE_KEY = "@recipe_explorer_favorites";

/**
 * Favorites Provider Component
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  /**
   * Load favorites from local storage
   */
  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Save favorites to local storage
   */
  const saveFavorites = async (newFavorites: Recipe[]) => {
    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
      throw error;
    }
  };

  /**
   * Add a recipe to favorites
   */
  const addFavorite = async (recipe: Recipe) => {
    const newFavorites = [...favorites, recipe];
    await saveFavorites(newFavorites);
  };

  /**
   * Remove a recipe from favorites
   */
  const removeFavorite = async (recipeId: string) => {
    const newFavorites = favorites.filter((fav) => fav.idMeal !== recipeId);
    await saveFavorites(newFavorites);
  };

  /**
   * Check if a recipe is in favorites
   */
  const isFavorite = (recipeId: string): boolean => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to use favorites context
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

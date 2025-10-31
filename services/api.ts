
import { Category, Recipe, RecipeListItem } from '@/types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';


export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new Error('Failed to search recipes');
  }
}


export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw new Error('Failed to fetch recipe details');
  }
}


export async function getRandomRecipe(): Promise<Recipe> {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw new Error('Failed to fetch random recipe');
  }
}


export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}


export async function getRecipesByCategory(category: string): Promise<RecipeListItem[]> {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw new Error('Failed to fetch recipes by category');
  }
}


export async function getMultipleRandomRecipes(count: number = 10): Promise<Recipe[]> {
  try {
    const promises = Array.from({ length: count }, () => getRandomRecipe());
    const recipes = await Promise.all(promises);
    return recipes;
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw new Error('Failed to fetch random recipes');
  }
}

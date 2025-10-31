# Quick Start Guide - Recipe Explorer

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start the App

```bash
npm start
```

### Step 3: Run on Device

- Press **`i`** for iOS Simulator (Mac only)
- Press **`a`** for Android Emulator
- Scan QR code with **Expo Go** app on your phone

## 📱 Using the App

### Browse Recipes

1. Open the app to see the **Home** screen
2. Browse random recipes in the grid layout
3. Scroll through categories at the top
4. Tap a category to filter recipes

### Search for Recipes

1. Tap the search bar at the top
2. Type a recipe name (e.g., "pasta", "chicken", "cake")
3. Press Enter or tap the filter button
4. Browse search results

### View Recipe Details

1. Tap any recipe card
2. View full recipe information:
   - Recipe image
   - Ingredients list
   - Cooking instructions
   - Category and origin
3. Tap the back arrow to return

### Save Favorites

1. Tap the **heart icon** on any recipe card
2. Recipe is saved to your Favorites
3. Heart turns red when favorited
4. Access all favorites from the **Favorites** tab

### Manage Favorites

1. Navigate to the **Favorites** tab (heart icon)
2. View all your saved recipes
3. Tap any recipe to view details
4. Tap heart again to remove from favorites

## 🎨 App Features

### Home Screen

- **Search Bar**: Find recipes by name
- **Categories**: Filter by food category
- **Recipe Grid**: Browse 2-column layout
- **Quick Favorite**: Heart icon on each card

### Recipe Details

- **Large Image**: Beautiful food photography
- **Ingredients**: Complete list with measurements
- **Instructions**: Step-by-step cooking guide
- **Save Button**: Add to favorites

### Favorites Tab

- **Your Collection**: All saved recipes
- **Quick Access**: Fast navigation
- **Easy Management**: Remove favorites anytime

## 🎯 Tips

### Best Practices

- Use **specific search terms** for better results
- Try **different categories** to discover new recipes
- **Save recipes** you want to try later
- Check **ingredients** before starting to cook

### Performance

- Search results load **10 recipes** at a time
- Categories fetch **limited recipes** for speed
- Favorites are **stored locally** on your device
- No internet needed to view **saved favorites**

## 🐛 Troubleshooting

### App won't start?

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --clear
```

### No recipes showing?

- Check your internet connection
- TheMealDB API might be down
- Try refreshing the screen
- Restart the app

### Favorites not saving?

- Ensure app has storage permissions
- Try adding favorite again
- Restart the app to reload

## 📞 Need Help?

- Check the main **README.md** for detailed info
- Review **IMPLEMENTATION.md** for technical details
- Visit TheMealDB API docs: https://www.themealdb.com/api.php

## 🎉 Enjoy Cooking!

Explore thousands of recipes, save your favorites, and start cooking! 👨‍🍳👩‍🍳

# Internet Simulator - Offline Web Experience

A mobile game that simulates an offline version of the internet, built with React Native and Expo. Experience browsing the web in a controlled, offline environment with thousands of simulated web pages.

## 🚀 Getting Started

### Prerequisites

Before running the app, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Expo Go app** on your mobile device
  - [Download for iOS](https://apps.apple.com/app/expo-go/id982107779)
  - [Download for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd internet-simulator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

## 📱 Running the App

### Method 1: Mobile Device (Recommended)
1. Run `npm start` in your terminal
2. A QR code will appear in the terminal
3. Open the **Expo Go** app on your phone
4. Scan the QR code with the app
5. The app will load on your device

### Method 2: Web Browser
1. Run `npm start`
2. Press `w` when prompted to open in web browser
3. The app will open at `http://localhost:19006`

### Method 3: Android Emulator
1. Set up Android Studio and an Android emulator
2. Run `npm run android`
3. The app will launch in the emulator

### Method 4: iOS Simulator (macOS only)
1. Install Xcode from the Mac App Store
2. Run `npm run ios`
3. The app will launch in the iOS simulator

## 📋 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android device/emulator
- `npm run ios` - Start the app on iOS device/simulator (macOS only)
- `npm run web` - Start the app in web browser

## 🏗️ Project Structure

```
internet-simulator/
├── assets/                          # App icons, splash screens, images
│   └── images/                     # Custom images and assets
├── src/                            # Source code
│   ├── components/                 # Reusable UI components
│   ├── navigation/                 # Navigation configuration
│   │   └── AppNavigator.js        # Main navigation stack
│   ├── pages/                     # Simulated web pages (scalable to thousands)
│   └── screens/                   # App screens
│       └── SearchScreen.js        # Main search interface ("Interverse")
├── App.js                         # Root component
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## 🎮 Current Features

- **Interverse Search Engine**: Clean, minimalist search interface
- **Modern UI**: Responsive design that works in portrait and landscape
- **Navigation Ready**: Stack navigation setup for future screens
- **Scalable Architecture**: Organized folder structure for thousands of pages

## 🚧 Development

### Adding New Screens
1. Create new screen components in `src/screens/`
2. Add them to the navigation stack in `src/navigation/AppNavigator.js`

### Adding Simulated Web Pages
1. Create page components in `src/pages/`
2. Organize in subdirectories by category or domain
3. Link them through the search functionality

### Adding Reusable Components
- Place shared UI components in `src/components/`
- Import and use across different screens

## 🔧 Troubleshooting

### Common Issues

**Metro Bundler won't start:**
- Make sure no other Metro instances are running
- Try `npx expo start --clear` to clear cache

**Can't connect to development server:**
- Ensure your phone and computer are on the same Wi-Fi network
- Check firewall settings on your computer

**Package version warnings:**
- These are usually safe to ignore for development
- Run `npx expo install --fix` to update to compatible versions

**App won't load on device:**
- Make sure Expo Go is up to date
- Try shaking the device and selecting "Reload"

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Documentation](https://reactnative.dev/)

## 🎯 Next Steps

1. **Implement Search Functionality**: Connect the search input to navigation
2. **Create Web Page Templates**: Build reusable components for simulated sites
3. **Add Page Categories**: Organize simulated pages by type (social, news, games, etc.)
4. **Implement Favorites**: Allow users to bookmark interesting pages
5. **Add Offline Features**: Simulate network connectivity states

---

**Ready to explore the offline web?** Run `npm start` and begin your journey through the Interverse! 🌐

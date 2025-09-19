import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import MeTubeHomeScreen from '../sites/metube/MeTubeHomeScreen';
import MeTubeWatchScreen from '../sites/metube/MeTubeWatchScreen';
import MeTubeChannelScreen from '../sites/metube/MeTubeChannelScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
      />
      <Stack.Screen
        name="MeTubeHome"
        component={MeTubeHomeScreen}
      />
      <Stack.Screen
        name="MeTubeWatch"
        component={MeTubeWatchScreen}
      />
      <Stack.Screen
        name="MeTubeChannel"
        component={MeTubeChannelScreen}
      />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

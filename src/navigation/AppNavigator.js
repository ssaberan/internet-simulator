import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import MeTubeHomeScreen from '../sites/metube/MeTubeHomeScreen';
import MeTubeWatchScreen from '../sites/metube/MeTubeWatchScreen';
import MeTubeChannelScreen from '../sites/metube/MeTubeChannelScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }} // Hide the header for the search screen
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ title: 'Interverse' }}
      />
      <Stack.Screen
        name="MeTubeHome"
        component={MeTubeHomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MeTubeWatch"
        component={MeTubeWatchScreen}
        options={{ title: 'MeTube' }}
      />
      <Stack.Screen
        name="MeTubeChannel"
        component={MeTubeChannelScreen}
        options={{ title: 'MeTube Channel' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

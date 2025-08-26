import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }} // Hide the header for the search screen
      />
      {/* Future simulated web pages will be added as screens here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;

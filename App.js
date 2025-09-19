import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/ErrorBoundary';
import { AddressBarProvider } from './src/context/AddressBarContext';
import AddressBar from './src/components/AddressBar';
import { navigationRef } from './src/navigation/navigationRef';

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AddressBarProvider>
          <NavigationContainer ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
          <AddressBar />
        </AddressBarProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
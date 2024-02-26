/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import AppNavigation from 'app/navigation/AppNavigation';
import queryClient from 'core/config/reactQuery.ts';
import {QueryClientProvider} from '@tanstack/react-query';
import {NavigationContainer} from '@react-navigation/native';
import palette from 'core/styles/palette.ts';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            animated={true}
            barStyle={'dark-content'}
            backgroundColor={palette.backgroundColor}
          />
          <AppNavigation />
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

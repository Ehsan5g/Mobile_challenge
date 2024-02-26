import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoutes} from './routes';
import {screenOption} from 'core/config/navigation';
import Home from 'features/home/screens/Home.tsx';

export type AppNavigatorParam = {
  [AppRoutes.Home_NAVIGATION]: undefined;
};
const Stack = createStackNavigator<AppNavigatorParam>();

const AppNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={screenOption}
      initialRouteName={AppRoutes.Home_NAVIGATION}>
      <Stack.Screen name={AppRoutes.Home_NAVIGATION} component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

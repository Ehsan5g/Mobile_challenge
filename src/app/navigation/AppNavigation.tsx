import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoutes} from './routes';
import {screenOption} from 'core/config/navigation';
import BottomTabsNavigation from 'app/navigation/BottomTabsNavigation.tsx';

export type AppNavigatorParam = {
  [AppRoutes.BOTTOM_TAB_NAVIGATION]: undefined;
};
const Stack = createStackNavigator<AppNavigatorParam>();

const AppNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={screenOption}
      initialRouteName={AppRoutes.BOTTOM_TAB_NAVIGATION}>
      <Stack.Screen
        name={AppRoutes.BOTTOM_TAB_NAVIGATION}
        component={BottomTabsNavigation}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;

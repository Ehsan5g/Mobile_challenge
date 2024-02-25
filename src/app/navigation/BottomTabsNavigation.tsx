import React from 'react';
import {BottomTabRoutes} from 'app/navigation/bottomTabRoutes.ts';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import fontSizes from 'core/styles/fontSizes.ts';
import palette from 'core/styles/palette.ts';
import {StyleSheet} from 'react-native';
import Text from 'core/components/Text';
import Icon from 'core/components/Icon';

export type BottomTabNavigationParam = {
  [BottomTabRoutes.HOME_NAVIGATION]: undefined;
  [BottomTabRoutes.SEARCH_NAVIGATION]: undefined;
};

type ScreenOption =
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<
        BottomTabNavigationParam,
        keyof BottomTabNavigationParam
      >;
      navigation: any;
    }) => BottomTabNavigationOptions)
  | undefined;

const Tab = createBottomTabNavigator<BottomTabNavigationParam>();

const BottomTabsNavigation = () => {
  const screenOption: ScreenOption = {
    headerShown: false,
    tabBarStyle: {
      height: 70,
      paddingBottom: 5,
      backgroundColor: palette.white,
      paddingHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabBarLabelStyle: {
      fontSize: fontSizes.t,
    },
    tabBarActiveTintColor: palette.primary,
    tabBarInactiveTintColor: palette.border,
    tabBarLabelPosition: 'below-icon',
    tabBarShowLabel: false,
    lazy: true,
  };
  return (
    <Tab.Navigator
      screenOptions={screenOption}
      initialRouteName={BottomTabRoutes.HOME_NAVIGATION}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name={'home'} size={24} color={color} />
          ),
        }}
        name={BottomTabRoutes.HOME_NAVIGATION}
        component={() => <Text>Home</Text>}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name={'magnify'} size={24} color={color} />
          ),
        }}
        name={BottomTabRoutes.SEARCH_NAVIGATION}
        component={() => <Text>search</Text>}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
export default BottomTabsNavigation;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoutes} from './routes';
import {screenOption} from 'core/config/navigation';
import Home from 'features/home/screens/Home';
import CreateBook from 'features/home/screens/CreateBook';
import {Book} from 'features/home/type/book.ts';
import BookDetails from 'features/home/screens/Book';

export enum TypeCreateBook {
  ADD = 'add',
  EDITE = 'edite',
}

export type AppNavigatorParam = {
  [AppRoutes.Home]: undefined;
  [AppRoutes.CREATE_BOOK]: {type: TypeCreateBook; book: Book | undefined};
  [AppRoutes.BOOK]: {bookId: string};
};
const Stack = createStackNavigator<AppNavigatorParam>();

const AppNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={screenOption}
      initialRouteName={AppRoutes.Home}>
      <Stack.Screen name={AppRoutes.Home} component={Home} />
      <Stack.Screen name={AppRoutes.CREATE_BOOK} component={CreateBook} />
      <Stack.Screen name={AppRoutes.BOOK} component={BookDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

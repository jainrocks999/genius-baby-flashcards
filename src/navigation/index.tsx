import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import _routes from './navigation_routes/routes';
export type navigationParams = {
  SPlash_Screen: undefined;
  SPlash_ScreenII: undefined;
  Home_Screen: undefined;
  Detail_Screen: undefined;
  Setting_Screen: undefined;
  Memory_Screen: undefined;
};
const Navigation = () => {
  type RouteKey = keyof navigationParams;

  const Stack = createStackNavigator<navigationParams>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={_routes.navigation_routes[0].name}>
        {_routes.navigation_routes.map(screen => {
          return (
            <Stack.Screen
              key={screen.name as RouteKey}
              name={screen.name}
              component={screen.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

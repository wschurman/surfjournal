import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Details from './Details';
import Home from './Home';

export type MainStackParamList = {
  Home: undefined;
  Details: { id: string };
};

const MainStack = createStackNavigator<MainStackParamList>();

export default () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} options={{ title: 'Surf Journal' }} />
    <MainStack.Screen name="Details" component={Details} />
  </MainStack.Navigator>
);

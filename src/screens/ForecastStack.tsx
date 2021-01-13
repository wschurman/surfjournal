import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import makeHeaderLeftOptions from '../helpers/makeHeaderLeftOptions';
import ForecastScreen from './ForecastScreen';

export type ForecastStackParamList = {
  ForecastScreen: undefined;
};

const ForecastStack = createStackNavigator<ForecastStackParamList>();

export default () => (
  <ForecastStack.Navigator>
    <ForecastStack.Screen
      name="ForecastScreen"
      component={ForecastScreen}
      options={makeHeaderLeftOptions({
        title: 'Forecast',
      })}
    />
  </ForecastStack.Navigator>
);

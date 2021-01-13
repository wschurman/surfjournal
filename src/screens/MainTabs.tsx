import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import ForecastScreen from './ForecastScreen';
import JournalEntriesStack from './JournalEntriesStack';

export type MainTabsParamList = {
  JournalEntriesStack: undefined;
  ForecastScreen: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        switch (route.name) {
          case 'JournalEntriesStack':
            return (
              <Ionicons name={focused ? 'journal' : 'journal-outline'} size={size} color={color} />
            );
          case 'ForecastScreen':
            return (
              <Ionicons name={focused ? 'rainy' : 'rainy-outline'} size={size} color={color} />
            );
        }
      },
    })}>
    <Tab.Screen
      name="JournalEntriesStack"
      component={JournalEntriesStack}
      options={{ tabBarLabel: 'Journal' }}
    />
    <Tab.Screen
      name="ForecastScreen"
      component={ForecastScreen}
      options={{ tabBarLabel: 'Forecast' }}
    />
  </Tab.Navigator>
);

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Platform } from 'react-native';

import ForecastStack from './ForecastStack';
import JournalEntriesStack from './JournalEntriesStack';

export type MainTabsParamList = {
  JournalEntriesStack: undefined;
  ForecastStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Drawer = createDrawerNavigator<MainTabsParamList>();

const MainTabs = () => (
  <Tab.Navigator initialRouteName="JournalEntriesStack">
    <Tab.Screen
      name="JournalEntriesStack"
      component={JournalEntriesStack}
      options={{
        tabBarLabel: 'Journal',
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons name={focused ? 'journal' : 'journal-outline'} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ForecastStack"
      component={ForecastStack}
      options={{
        tabBarLabel: 'Forecast',
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons name={focused ? 'rainy' : 'rainy-outline'} size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainDrawer = () => (
  <Drawer.Navigator initialRouteName="JournalEntriesStack">
    <Drawer.Screen
      name="JournalEntriesStack"
      component={JournalEntriesStack}
      options={{
        drawerLabel: 'Journal',
      }}
    />
    <Drawer.Screen
      name="ForecastStack"
      component={ForecastStack}
      options={{
        drawerLabel: 'Forecast',
      }}
    />
  </Drawer.Navigator>
);

export default Platform.OS === 'ios' ? MainTabs : MainDrawer;

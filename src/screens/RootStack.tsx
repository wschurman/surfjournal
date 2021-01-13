import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import MainTabs from './MainTabs';
import NewJournalEntryScreen from './NewJournalEntryScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  NewJournalEntryScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default () => (
  <RootStack.Navigator mode="modal">
    <RootStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    <RootStack.Screen
      name="NewJournalEntryScreen"
      component={NewJournalEntryScreen}
      options={{ title: 'Add Journal Entry' }}
    />
  </RootStack.Navigator>
);

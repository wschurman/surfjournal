import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import JournalEntryDetailsScreen from './JournalEntryDetailsScreen';
import JournalEntryListScreen from './JournalEntryListScreen';

export type HomeStackParamList = {
  JournalEntryListScreen: undefined;
  JournalEntryDetailsScreen: { id: string };
};

const MainStack = createStackNavigator<HomeStackParamList>();

export default () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="JournalEntryListScreen"
      component={JournalEntryListScreen}
      options={{ title: 'Surf Journal' }}
    />
    <MainStack.Screen name="JournalEntryDetailsScreen" component={JournalEntryDetailsScreen} />
  </MainStack.Navigator>
);

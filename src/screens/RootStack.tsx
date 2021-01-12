import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import MainStack from './MainStack';
import NewJournalEntry from './NewJournalEntry';

export type RootStackParamList = {
  Main: undefined;
  NewJournalEntryModal: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default () => (
  <RootStack.Navigator mode="modal">
    <RootStack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
    <RootStack.Screen
      name="NewJournalEntryModal"
      component={NewJournalEntry}
      options={{ title: 'Add Journal Entry' }}
    />
  </RootStack.Navigator>
);

import { Ionicons } from '@expo/vector-icons';
import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

export default function (
  stackNavigationActions: StackNavigationOptions
): ({ navigation }: { navigation: any }) => StackNavigationOptions {
  return ({ navigation }) => ({
    ...stackNavigationActions,
    headerLeft: () => (
      <Ionicons
        style={{ marginLeft: 10 }}
        name="md-menu"
        size={32}
        color="#222"
        onPress={() => navigation.openDrawer()}
      />
    ),
  });
}

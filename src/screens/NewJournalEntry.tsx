import { StackScreenProps } from '@react-navigation/stack';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { RootStackParamList, journalEntriesSlice } from '../App';

type Props = StackScreenProps<RootStackParamList, 'NewJournalEntryModal'>;

export default ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const onPress = async () => {
    dispatch(
      journalEntriesSlice.actions.journalEntryAdded({
        id: nanoid(),
        title: 'wat',
        body: 'new phone who dis',
        createdAt: new Date(),
      })
    );
    navigation.pop();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={onPress} title="Wat" />
    </View>
  );
};

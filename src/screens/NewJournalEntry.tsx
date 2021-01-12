import { StackScreenProps } from '@react-navigation/stack';
import { nanoid } from '@reduxjs/toolkit';
import React, { useLayoutEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { journalEntriesSlice } from '../data/journalEntriesReducer';
import { RootStackParamList } from './RootStack';

type Props = StackScreenProps<RootStackParamList, 'NewJournalEntryModal'>;

export default ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onPressSubmit = async () => {
    dispatch(
      journalEntriesSlice.actions.journalEntryAdded({
        id: nanoid(),
        title,
        body,
        createdAt: new Date().toString(),
      })
    );
    navigation.pop();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // @ts-expect-error
      headerLeft: null,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.pop()} style={{ marginRight: 10 }}>
          <Text style={{ fontSize: 18, color: 'blue' }}>Close</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        keyboardType="default"
        onChangeText={(text) => setTitle(text)}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={body}
        keyboardType="default"
        onChangeText={(text) => setBody(text)}
        placeholder="Body"
        style={styles.input}
      />
      <Button onPress={onPressSubmit} disabled={!title || !body} title="Save" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    padding: 4,
    marginBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

import * as React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { JournalEntry } from '../data/journalEntriesReducer';

type Props = {
  journalEntry: JournalEntry;
  onPress: (journalEntry: JournalEntry) => void;
};

export default (props: Props) => {
  return (
    <Pressable
      onPress={() => props.onPress(props.journalEntry)}
      style={({ pressed }) => [{ backgroundColor: pressed ? '#eee' : '#fff' }, styles.item]}>
      <Text style={styles.title}>{props.journalEntry.title}</Text>
      <Text style={styles.date}>{new Date(props.journalEntry.createdAt).toLocaleString()}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
  },
  title: {
    fontSize: 16,
  },
  date: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
});

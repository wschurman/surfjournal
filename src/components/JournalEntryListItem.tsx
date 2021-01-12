import * as React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { JournalEntry } from '../data/JournalEntry';

type Props = {
  journalEntry: JournalEntry;
  onPress: (journalEntry: JournalEntry) => void;
};

export default (props: Props) => {
  return (
    <Pressable onPress={() => props.onPress(props.journalEntry)} style={styles.item}>
      <Text style={styles.title}>{props.journalEntry.title}</Text>
      <Text style={styles.body}>{props.journalEntry.body}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  body: {
    fontSize: 28,
  },
});

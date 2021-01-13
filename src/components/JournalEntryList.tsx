import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { JournalEntry } from '../data/journalEntriesReducer';
import JournalEntryListItem from './JournalEntryListItem';

type Props = {
  journalEntries: JournalEntry[];
  onPressJournalEntry: (journalEntry: JournalEntry) => void;
};

const Separator = () => <View style={{ height: StyleSheet.hairlineWidth }} />;

const Empty = () => (
  <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
    <Text style={{ marginTop: 30, fontSize: 20 }}>No Journal Entries</Text>
  </View>
);

export default (props: Props) => {
  const renderItem = ({ item }: { item: JournalEntry }) => (
    <JournalEntryListItem journalEntry={item} onPress={props.onPressJournalEntry} />
  );

  return (
    <FlatList
      data={props.journalEntries}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={Empty}
    />
  );
};

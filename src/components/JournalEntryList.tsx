import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { JournalEntry } from '../data/journalEntriesReducer';
import JournalEntryListItem from './JournalEntryListItem';

type Props = {
  journalEntries: JournalEntry[];
  onPressJournalEntry: (journalEntry: JournalEntry) => void;
};

const Separator = () => <View style={{ height: StyleSheet.hairlineWidth }} />;

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
    />
  );
};

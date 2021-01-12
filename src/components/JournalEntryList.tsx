import * as React from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { JournalEntry } from '../data/JournalEntry';
import JournalEntryListItem from './JournalEntryListItem';

type Props = {
  journalEntries: JournalEntry[];
  onPressJournalEntry: (journalEntry: JournalEntry) => void;
};

export default (props: Props) => {
  const renderItem = ({ item }: { item: JournalEntry }) => (
    <JournalEntryListItem journalEntry={item} onPress={props.onPressJournalEntry} />
  );

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={props.journalEntries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

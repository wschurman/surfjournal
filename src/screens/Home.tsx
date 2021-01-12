import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { Button, View } from 'react-native';
import { connect } from 'react-redux';

import { MainStackParamList, RootStackParamList, RootState, journalEntriesSelectors } from '../App';
import JournalEntryList from '../components/JournalEntryList';
import { JournalEntry } from '../data/JournalEntry';

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  CompositeNavigationProp<
    StackNavigationProp<MainStackParamList>,
    StackNavigationProp<RootStackParamList>
  >
>;

const Home = ({
  navigation,
  journalEntries,
}: {
  navigation: HomeScreenNavigationProp;
  journalEntries: JournalEntry[];
}) => {
  const onPressJournalEntry = (journalEntry: JournalEntry) => {
    navigation.push('Details', { id: journalEntry.id });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate('NewJournalEntryModal')} title="Add" />
      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <JournalEntryList journalEntries={journalEntries} onPressJournalEntry={onPressJournalEntry} />
    </View>
  );
};

export default connect((state: RootState) => ({
  journalEntries: journalEntriesSelectors.selectAll(state),
}))(Home);

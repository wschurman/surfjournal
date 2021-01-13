import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import JournalEntryList from '../components/JournalEntryList';
import { journalEntriesSelectors, JournalEntry } from '../data/journalEntriesReducer';
import { RootState } from '../data/store';
import { HomeStackParamList } from './JournalEntriesStack';
import { RootStackParamList } from './RootStack';

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'JournalEntryListScreen'>,
  CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList>,
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
    navigation.push('JournalEntryDetailsScreen', { id: journalEntry.id });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons.Button
          onPress={() => navigation.navigate('NewJournalEntryScreen')}
          // @ts-expect-error
          backgroundColor="white"
          name="add"
          color="blue"
          size={30}
        />
      ),
    });
  }, [navigation]);

  return (
    <JournalEntryList journalEntries={journalEntries} onPressJournalEntry={onPressJournalEntry} />
  );
};

export default connect((state: RootState) => ({
  journalEntries: journalEntriesSelectors.selectAll(state),
}))(Home);

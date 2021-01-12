import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { Pressable } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import JournalEntryList from '../components/JournalEntryList';
import { journalEntriesSelectors, JournalEntry } from '../data/journalEntriesReducer';
import { RootState } from '../data/store';
import { MainStackParamList } from './MainStack';
import { RootStackParamList } from './RootStack';

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
        <TouchableOpacity
          onPress={() => navigation.navigate('NewJournalEntryModal')}
          style={{ marginRight: 10 }}>
          <Ionicons name="add" color="blue" size={30} />
        </TouchableOpacity>
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

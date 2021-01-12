import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import { journalEntriesSelectors, MainStackParamList, RootStackParamList, RootState } from '../App';
import { JournalEntry } from '../data/JournalEntry';

type DetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Details'>,
  CompositeNavigationProp<
    StackNavigationProp<MainStackParamList>,
    StackNavigationProp<RootStackParamList>
  >
>;

const Details = ({
  navigation,
  journalEntry,
}: {
  navigation: DetailsScreenNavigationProp;
  journalEntry: JournalEntry | undefined;
}) => {
  if (!journalEntry) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Not Found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Title: {journalEntry.title}</Text>
      <Text>Title: {journalEntry.body}</Text>
      <Text>Title: {journalEntry.createdAt.toString()}</Text>
    </View>
  );
};

export default connect((state: RootState, props: { route: { params: { id: string } } }) => {
  return {
    journalEntry: journalEntriesSelectors.selectById(state, props.route.params.id),
  };
})(Details);

import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import StarRater from '../components/StarRater';
import {
  journalEntriesSelectors,
  journalEntriesSlice,
  JournalEntry,
} from '../data/journalEntriesReducer';
import { RootState } from '../data/store';
import { formatForecast } from '../utils/formatting';
import { HomeStackParamList } from './JournalEntriesStack';
import { RootStackParamList } from './RootStack';

type DetailsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, 'JournalEntryDetailsScreen'>,
  CompositeNavigationProp<
    StackNavigationProp<HomeStackParamList>,
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
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: journalEntry ? journalEntry.spot.name : 'Not Found',
    });
  }, [navigation]);

  if (!journalEntry) {
    return (
      <View style={styles.container}>
        <Text>Not Found</Text>
      </View>
    );
  }

  const onPressDelete = async () => {
    dispatch(journalEntriesSlice.actions.deleteJournalEntry(journalEntry.id));
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{new Date(journalEntry.createdAt).toLocaleString()}</Text>
      <Text style={styles.body}>{journalEntry.body}</Text>
      <Text style={styles.body}>{formatForecast(journalEntry.forecast)}</Text>
      <StarRater value={journalEntry.rating} onChange={() => {}} />
      <View style={styles.deleteButton}>
        {/* @ts-expect-error */}
        <Ionicons.Button name="trash-bin" backgroundColor="red" onPress={onPressDelete}>
          Delete
        </Ionicons.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  date: {
    fontSize: 14,
    marginTop: 10,
  },
  body: {
    marginTop: 10,
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 40,
  },
});

export default connect((state: RootState, props: { route: { params: { id: string } } }) => {
  return {
    journalEntry: journalEntriesSelectors.selectById(state, props.route.params.id),
  };
})(Details);

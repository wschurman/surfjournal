import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { nanoid } from '@reduxjs/toolkit';
import nullthrows from 'nullthrows';
import React, { useLayoutEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import StarRater from '../components/StarRater';
import { journalEntriesSlice } from '../data/journalEntriesReducer';
import { spotFavoritesSelectors } from '../data/spotFavoritesReducer';
import { RootState } from '../data/store';
import Surfline, { Forecast, Spot } from '../utils/Surfline';
import { RootStackParamList } from './RootStack';

type Props = StackScreenProps<RootStackParamList, 'NewJournalEntryScreen'> & {
  spotFavorites: Spot[];
};

const INVALID_SPOT_SENTINEL = 'invalid';

const NewJournalEntryScreen = ({ navigation, spotFavorites }: Props) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [spotId, setSpotId] = useState(INVALID_SPOT_SENTINEL);

  const onPressSubmit = async () => {
    let spot: Spot;
    let forecast: Forecast;
    try {
      const report = await Surfline.fetchReport(nullthrows(spotId));
      forecast = report.forecast;
      spot = nullthrows(spotFavorites.find((sf) => sf.id === spotId));
    } catch (e) {
      setSpotId(INVALID_SPOT_SENTINEL);
      return;
    }
    dispatch(
      journalEntriesSlice.actions.journalEntryAdded({
        id: nanoid(),
        body,
        createdAt: new Date().toString(),
        spot,
        forecast,
        rating: starRating,
      })
    );
    navigation.pop();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // @ts-expect-error
      headerLeft: null,
      headerRight: () => <Button title="Cancel" onPress={() => navigation.pop()} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        value={body}
        keyboardType="default"
        onChangeText={(text) => setBody(text)}
        placeholder="Note"
        style={styles.input}
      />
      <StarRater value={starRating} onChange={(value) => setStarRating(value)} />
      <Picker
        selectedValue={spotId}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setSpotId(itemValue as string)}>
        <Picker.Item label="Select a Spot" value={INVALID_SPOT_SENTINEL} />
        {spotFavorites.map((spot) => (
          <Picker.Item label={spot.name} value={spot.id} />
        ))}
      </Picker>
      <Button
        onPress={onPressSubmit}
        disabled={starRating === 0 || !body || spotId === INVALID_SPOT_SENTINEL}
        title="Save"
      />
    </View>
  );
};

export default connect((state: RootState) => {
  return {
    spotFavorites: spotFavoritesSelectors.selectAll(state),
  };
})(NewJournalEntryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    padding: 4,
    marginBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

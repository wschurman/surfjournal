import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { spotFavoritesSelectors, spotFavoritesSlice } from '../data/spotFavoritesReducer';
import { RootState } from '../data/store';
import Surfline, { Report, Spot } from '../utils/Surfline';
import { formatFullReport } from '../utils/formatting';

const ForecastSearchResult = ({
  searchText,
  spotFavorites,
}: {
  searchText: string;
  spotFavorites: Spot[];
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{ report: Report; spot: Spot } | Error | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchReport = async () => {
        setLoading(true);
        try {
          const spot = await Surfline.searchSpots(searchText);
          if (spot) {
            const report = await Surfline.fetchReport(spot.id);
            if (isActive) {
              setResult({ report, spot });
            }
          }
        } catch (e) {
          if (isActive) {
            setResult(e);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchReport();

      return () => {
        isActive = false;
      };
    }, [searchText])
  );

  if (loading) {
    return <ActivityIndicator size="large" animating />;
  }

  if (result instanceof Error) {
    return <Text>Error: {result.message}</Text>;
  }

  if (!result) {
    return <View />;
  }

  const camURL = result.report?.cam.cameraStillUrl;

  const isAlreadyAFavorite = spotFavorites.find((sf) => sf.id === result.spot.id);

  const onPressSave = () => {
    if (isAlreadyAFavorite) {
      dispatch(spotFavoritesSlice.actions.removeSpotFavorite(result.spot.id));
    } else {
      dispatch(spotFavoritesSlice.actions.spotFavoriteAdded(result.spot));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.saveButton}>
        <Ionicons.Button
          name={isAlreadyAFavorite ? 'star' : 'star-outline'}
          /* @ts-expect-error */
          backgroundColor={isAlreadyAFavorite ? 'green' : 'gold'}
          onPress={onPressSave}>
          {isAlreadyAFavorite ? 'Unfavorite' : 'Favorite'}
        </Ionicons.Button>
      </View>

      {camURL ? (
        <Image
          style={styles.camImage}
          source={{
            uri: camURL,
          }}
        />
      ) : null}
      <Text>{result.spot.name}</Text>
      <Text>{formatFullReport(result.report)}</Text>
    </ScrollView>
  );
};

export default connect((state: RootState) => {
  return {
    spotFavorites: spotFavoritesSelectors.selectAll(state),
  };
})(ForecastSearchResult);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  saveButton: {
    marginBottom: 30,
  },
  camImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});

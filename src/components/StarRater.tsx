import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const Star = ({ on, onPress }: { on: boolean; onPress: () => void }) => {
  return (
    <Ionicons.Button
      name={on ? 'star' : 'star-outline'}
      // @ts-expect-error
      backgroundColor="white"
      style={styles.star}
      color="gold"
      onPress={onPress}
    />
  );
};

export default (props: Props) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((v) => (
        <Star key={`star-${v}`} on={props.value >= v} onPress={() => props.onChange(v)} />
      ))}
    </View>
  );
};

const STAR_SIZE = 30;
const STARGIN = 5;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: STAR_SIZE * 5 + STARGIN * 5,
  },
  star: {
    width: STAR_SIZE,
    height: STAR_SIZE,
    marginEnd: STARGIN,
    padding: 0,
  },
});

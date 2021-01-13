import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import ForecastSearchResult from '../components/ForecastSearchResult';

export default () => {
  const [searchText, setSearchText] = useState('');
  const [resultSearchText, setResultSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={searchText}
          keyboardType="default"
          onChangeText={(text) => setSearchText(text)}
          placeholder="Search for a Spot"
          style={styles.input}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            setResultSearchText(searchText);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setResultSearchText(searchText);
          }}
          style={styles.searchButton}>
          <Ionicons name="search-circle" color="blue" size={30} />
        </TouchableOpacity>
      </View>
      <ForecastSearchResult searchText={resultSearchText} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchButton: {
    flexGrow: 0,
  },
  input: {
    flexGrow: 1,
    padding: 4,
    marginBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

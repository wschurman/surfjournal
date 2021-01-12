import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  configureStore,
  createEntityAdapter,
  createSlice,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Provider } from 'react-redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { JournalEntry } from './data/JournalEntry';
import Details from './screens/Details';
import Home from './screens/Home';
import NewJournalEntry from './screens/NewJournalEntry';

export type MainStackParamList = {
  Home: undefined;
  Details: { id: string };
};

export type RootStackParamList = {
  Main: undefined;
  NewJournalEntryModal: undefined;
};

export const journalEntriesAdapter = createEntityAdapter<JournalEntry>({
  selectId: (journalEntry) => journalEntry.id,
  sortComparer: (a, b) => (a < b ? -1 : b < a ? 1 : 0),
});

export const journalEntriesSlice = createSlice({
  name: 'journalEntries',
  initialState: journalEntriesAdapter.getInitialState(),
  reducers: {
    journalEntryAdded: journalEntriesAdapter.addOne,
  },
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    journalEntries: persistReducer(persistConfig, journalEntriesSlice.reducer),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export const journalEntriesSelectors = journalEntriesAdapter.getSelectors<RootState>(
  (state) => state.journalEntries
);

const MainStack = createStackNavigator<MainStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Details" component={Details} />
  </MainStack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="NewJournalEntryModal" component={NewJournalEntry} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

registerRootComponent(App);

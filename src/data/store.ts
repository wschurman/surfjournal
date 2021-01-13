import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
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

import { journalEntriesSlice } from './journalEntriesReducer';
import { spotFavoritesSlice } from './spotFavoritesReducer';

const journalEntriesPersistConfig = {
  key: 'journal_entries',
  version: 1,
  storage: AsyncStorage,
};

const spotFavoritesPersistConfig = {
  key: 'spot_favorites',
  version: 1,
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    journalEntries: persistReducer(journalEntriesPersistConfig, journalEntriesSlice.reducer),
    spotFavorites: persistReducer(spotFavoritesPersistConfig, spotFavoritesSlice.reducer),
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

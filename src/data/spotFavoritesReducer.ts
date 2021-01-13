import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Spot } from '../utils/Surfline';
import { RootState } from './store';

export const spotFavoritesAdapter = createEntityAdapter<Spot>({
  selectId: (spot) => spot.id,
  sortComparer: (a, b) => {
    return a.name < b.name ? -1 : b.name < a.name ? 1 : 0;
  },
});

export const spotFavoritesSlice = createSlice({
  name: 'spotFavorites',
  initialState: spotFavoritesAdapter.getInitialState(),
  reducers: {
    spotFavoriteAdded: spotFavoritesAdapter.addOne,
    removeSpotFavorite: spotFavoritesAdapter.removeOne,
  },
});

export const spotFavoritesSelectors = spotFavoritesAdapter.getSelectors<RootState>(
  (state) => state.spotFavorites
);

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface JournalEntry {
  id: string;
  createdAt: string;
  title: string;
  body: string;
}

export const journalEntriesAdapter = createEntityAdapter<JournalEntry>({
  selectId: (journalEntry) => journalEntry.id,
  sortComparer: (a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate < bDate ? -1 : bDate < aDate ? 1 : 0;
  },
});

export const journalEntriesSlice = createSlice({
  name: 'journalEntries',
  initialState: journalEntriesAdapter.getInitialState(),
  reducers: {
    journalEntryAdded: journalEntriesAdapter.addOne,
    deleteJournalEntry: journalEntriesAdapter.removeOne,
  },
});

export const journalEntriesSelectors = journalEntriesAdapter.getSelectors<RootState>(
  (state) => state.journalEntries
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { type UnitId } from './collectionsReducer';

export interface DataState {
    currentObjectId?: UnitId,
    currentObjectsIds?: UnitId[],
}

const initialState: DataState = {
    currentObjectId: undefined,
    currentObjectsIds: undefined,
};

export const counterSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentObjectId: (state, action: PayloadAction<UnitId | undefined>) => {
      state.currentObjectId = action.payload;
    },
  },
});

export const { setCurrentObjectId } = counterSlice.actions;

export const selectCurrentObjectId = (state: RootState) => state.data.currentObjectId;

export default counterSlice.reducer;

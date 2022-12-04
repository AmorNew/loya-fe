import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { type UnitId } from './collectionsReducer';


export type SearchParams = {
  text?: string;
  box?: {
    left_top: {
      lat: number,
      lon: number,
    },
    right_bottom: {
      lat: number,
      lon: number,
    }
  },
  order_by?: string,
  order_direction?: string,
}
export interface DataState {
    currentObjectId?: UnitId,
    currentObjectsIds?: UnitId[],
    searchParams: SearchParams,
}

const initialState: DataState = {
    currentObjectId: undefined,
    currentObjectsIds: undefined,
    searchParams: {
      text: '',
      order_by: 'visible_name',
      order_direction: 'asc',
    },
};

export const counterSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentObjectId: (state, action: PayloadAction<UnitId | undefined>) => {
      state.currentObjectId = action.payload;
    },
    setSearchParams: (state, action: PayloadAction<SearchParams>) => {
      state.searchParams = {
        ...state.searchParams,  
        ...action.payload,
      };
    }
  },
});

export const { setCurrentObjectId, setSearchParams } = counterSlice.actions;

export const selectCurrentObjectId = (state: RootState) => state.data.currentObjectId;
export const selectSearchParams = (state: RootState) => state.data.searchParams;


export default counterSlice.reducer;

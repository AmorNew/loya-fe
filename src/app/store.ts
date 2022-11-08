import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import collectionsReducer from './reducers/collectionsReducer';
import dataReducer from './reducers/dataReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
    collections: collectionsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

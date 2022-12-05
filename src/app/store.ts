import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import collectionsReducer from './reducers/collectionsReducer';
import dataReducer from './reducers/dataReducer';
import userReducer from './reducers/userReducer';
import { loyaBackendApi } from './api/loyaBackendAPI';
import pointsReducer from './reducers/pointsReducer';
import { nominatimApi } from './api/nominatimAPI';


export const store = configureStore({
  reducer: {
    data: dataReducer,
    collections: collectionsReducer,
    points: pointsReducer,
    user: userReducer,
    [loyaBackendApi.reducerPath]: loyaBackendApi.reducer,
    [nominatimApi.reducerPath]: nominatimApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(loyaBackendApi.middleware, nominatimApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

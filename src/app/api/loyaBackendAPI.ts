import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store';

import { Unit, UpdateUnit } from '../reducers/collectionsReducer';
import { Point } from '../../schema/position_pb';
import { setPoints } from '../reducers/pointsReducer';
import { counterSlice, SearchParams, selectSearchParams } from '../reducers/dataReducer';


export const loyaBackendApi = createApi({
  reducerPath: 'loyaBackendApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      
      const identity = (getState() as RootState).user.identity;

      if (identity !== undefined && identity !== false && process.env.NODE_ENV === "development") {
        headers.set('x-user-id', String(identity.id));
      }
    
      return headers
    },
  }),
  tagTypes: ['Unit'],
  endpoints: (builder) => ({
    status: builder.query<Unit, string>({
      query: () => ({ url: `status`, method: 'POST', credentials: 'include', }),
    }),
    filterUnits: builder.query({
      query: ({
        text = '', 
        order_by = "visible_name",
        order_direction = "asc",
    }) => {
      const boxString = localStorage.getItem('box');
      const box = boxString ? JSON.parse(boxString) : undefined;

      return ({ 
        credentials: 'include', 
        url: `filterUnits`, 
        method: 'POST', 
        body: 
          {
            "filter": {
              text,
              box,
              order_by,
              order_direction,
            },
            "limit": 100,
            "offset": 0
          }
      })},
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, dispatch }
      ) {        
        const {data} = await cacheDataLoaded;

        const points = data.result.units.reduce((acc: Point.AsObject[], {device: {hw_id}, position}: Unit): Point.AsObject[] => {
          if (position) {
            const {latitude, longitude, last_nav_data: {nsat, course, speed}, updated_at} = position;

            let point: Point.AsObject  = {
              deviceId: hw_id,
              latitude,
              longitude,
              speed,
              nsat,
              course,

              pdop: 0,
              hdop: 0,
              vdop: 0,
              ns: 0,
              liquidSensorsList: [],
              anSensorsList: [],
              navigationTime: updated_at,
              receivingTime: updated_at,
            }

            acc.push(point);
          }
          
          return acc;
        }, []);

        dispatch(setPoints(points));
      },
      providesTags: (result) =>
        {
          return result
            ? [
                ...result.result.units.map(({ id }: any) => ({ type: 'Unit', id } as const)),
                { type: 'Unit', id: 'LIST' },
              ]
            : [{ type: 'Unit', id: 'LIST' }]}
    }),
    createUnit: builder.mutation<Unit, Unit>({
      query: (unit: Unit) => ({credentials: 'include', url: `createUnit`, method: 'POST', body: unit}),
      invalidatesTags: (result, error, {id}) => [{ type: 'Unit', id: 'LIST' }],
    }),
    updateUnit: builder.mutation<UpdateUnit, UpdateUnit>({
      query: (unit: Unit) => ({credentials: 'include', url: `updateUnit`, method: 'POST', body: unit}),
      invalidatesTags: (result, error, {id}) => [{ type: 'Unit', id }],
    }),
    deleteUnit: builder.mutation<UpdateUnit, UpdateUnit>({
      query: (unit: Unit) => ({credentials: 'include', url: `deleteUnit`, method: 'POST', body: unit}),
      invalidatesTags: (result, error, {id}) => [{ type: 'Unit', id }],
    }),
  }),
})

export const { 
  useStatusQuery, 
  useFilterUnitsQuery, 
  useCreateUnitMutation, 
  useUpdateUnitMutation, 
  useDeleteUnitMutation
 } = loyaBackendApi

export default loyaBackendApi;

const emptyUsers: any = [];

export const selectAllUnits = (state: RootState) => loyaBackendApi.endpoints.filterUnits.select(state.data.searchParams)(state)?.data?.result?.units || emptyUsers;

export const selectUnitById = createSelector(
  selectAllUnits,
  (state: any, unitId: any) => unitId,
  (units, unitId) => units.find((unit: any) => unit.id === unitId)
)

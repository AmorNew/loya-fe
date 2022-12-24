import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store';

import { Group, Unit, UpdateGroup, UpdateUnit } from '../reducers/collectionsReducer';
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
  tagTypes: ['Unit', 'Group'],
  endpoints: (builder) => ({
    status: builder.query<Unit, string>({
      query: () => ({ url: `status`, method: 'POST', credentials: 'include', }),
    }),

    filterUnits: builder.query({
      query: ({
        text = '',
        box, 
        group_ids,
        useCoordinates = true,
        order_by = "visible_name",
        order_direction = "asc",
    }) => {
      return ({ 
        credentials: 'include', 
        url: `filterUnits`, 
        method: 'POST', 
        body: 
          {
            filter: {
              text,
              group_ids,
              box: useCoordinates ? box : undefined,
            },
            order_by,
            order_direction,
            limit: 100,
            offset: 0
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

    filterGroups: builder.query({
      query: ({
        text = '', 
        order_by = "name",
        order_direction = "asc",
      }) => {
        return ({ 
          credentials: 'include', 
          url: `filterGroups`, 
          method: 'POST', 
          body: 
            {
              "filter": {
                text,
              },
              order_by,
              order_direction,
              limit: 100,
              offset: 0
            }
        })},
      providesTags: (result) =>
        {
          return result
            ? [
                ...result.result.groups.map(({ id }: any) => ({ type: 'Group', id } as const)),
                { type: 'Group', id: 'LIST' },
              ]
            : [{ type: 'Group', id: 'LIST' }]}
    }),
    createGroup: builder.mutation({
      query: (unit: UpdateGroup) => ({credentials: 'include', url: `createGroup`, method: 'POST', body: unit}),
      invalidatesTags: (result, error) => [{ type: 'Group', id: 'LIST' }],
    }),

    linkUnitGroup: builder.mutation({
      query: ({
        groupId,
        unitId,
      }: {groupId: number, unitId: number}) => {
        return ({ 
          credentials: 'include', 
          url: `linkUnitGroup`, 
          method: 'POST', 
          body: 
          {
            group_id: groupId,
            unit_id: unitId,
          }
        })},

      invalidatesTags: (result, error, {unitId}) => [{ type: 'Unit', id: unitId }],
    }),
    unlinkUnitGroup: builder.mutation({
      query: ({
        groupId,
        unitId,
      }: {groupId: number, unitId: number}) => {
        return ({ 
          credentials: 'include', 
          url: `unlinkUnitGroup`, 
          method: 'POST', 
          body: 
          {
            group_id: groupId,
            unit_id: unitId,
          }
        })},

      invalidatesTags: (result, error, {unitId}) => [{ type: 'Unit', id: unitId }],
    }),

    filterUnitHistory: builder.query({
      query: ({
        unit_id,
        category,
        created_from,
        created_to,
        order_by = "created_at",
        order_direction = "asc",
    }) => {
      return ({ 
        credentials: 'include', 
        url: `filterUnitHistory`, 
        method: 'POST', 
        body: {
          filter: {
            unit_id,
            category,
            created_from,
            created_to,
          },
          order_by,
          order_direction,
          limit: 100,
          offset: 0
        }
      })},
      // async onCacheEntryAdded(
      //   arg,
      //   { cacheDataLoaded, dispatch }
      // ) {        
      //   const {data} = await cacheDataLoaded;

      //   // const points = data.result.units.reduce((acc: Point.AsObject[], {device: {hw_id}, position}: Unit): Point.AsObject[] => {
      //   //   if (position) {
      //   //     const {latitude, longitude, last_nav_data: {nsat, course, speed}, updated_at} = position;

      //   //     let point: Point.AsObject  = {
      //   //       deviceId: hw_id,
      //   //       latitude,
      //   //       longitude,
      //   //       speed,
      //   //       nsat,
      //   //       course,
      //   //       pdop: 0,
      //   //       hdop: 0,
      //   //       vdop: 0,
      //   //       ns: 0,
      //   //       liquidSensorsList: [],
      //   //       anSensorsList: [],
      //   //       navigationTime: updated_at,
      //   //       receivingTime: updated_at,
      //   //     }

      //   //     acc.push(point);
      //   //   }
          
      //   //   return acc;
      //   // }, []);

      //   // dispatch(setPoints(points));
      // },
      // providesTags: (result) =>
      //   {
      //     return result
      //       ? [
      //           ...result.result.units.map(({ id }: any) => ({ type: 'Unit', id } as const)),
      //           { type: 'History', id: 'LIST' },
      //         ]
      //       : [{ type: 'History', id: 'LIST' }]}
    }),
  }),
})

export const { 
  useStatusQuery, 
  useFilterUnitsQuery, 
  useCreateUnitMutation, 
  useUpdateUnitMutation, 
  useDeleteUnitMutation,

  useCreateGroupMutation,
  useFilterGroupsQuery,
  useLinkUnitGroupMutation,
  useUnlinkUnitGroupMutation,

  useLazyFilterGroupsQuery,
  useLazyFilterUnitsQuery,

  useFilterUnitHistoryQuery,
  useLazyFilterUnitHistoryQuery,
 } = loyaBackendApi

export default loyaBackendApi;

const emptyUsers: any = [];

export const selectAllUnits = (state: RootState) => loyaBackendApi.endpoints.filterUnits.select(state.data.searchParams)(state)?.data?.result?.units || emptyUsers;

export const selectUnitById = createSelector(
  selectAllUnits,
  (state: any, unitId: any) => unitId,
  (units, unitId) => units.find((unit: any) => unit.id === unitId)
);



export const selectAllGroups = (state: RootState) => loyaBackendApi.endpoints.filterGroups.select({
  text: '', 
  order_by: "name",
  order_direction: "asc",
})(state)?.data?.result?.groups || emptyUsers;
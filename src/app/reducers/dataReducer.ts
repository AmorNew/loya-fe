import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

import { type UnitId } from './collectionsReducer'

export type SearchParams = {
    text?: string
    box?: null | {
        left_top: {
            lat: number
            lon: number
        }
        right_bottom: {
            lat: number
            lon: number
        }
    }
    group_ids?: number[]
    useCoordinates?: boolean
    order_by?: string
    order_direction?: string
}
export interface DataState {
    currentObjectId?: UnitId
    currentObjectsIds?: UnitId[]
    searchParams: SearchParams
}

const initialState: () => DataState = () => {
    // TODO: BS! Need refactoring!
    const boxString = localStorage.getItem('box')
    const box = boxString && document.location.pathname.includes('map') ? JSON.parse(boxString) : undefined

    return {
        currentObjectId: undefined,
        currentObjectsIds: undefined,
        searchParams: {
            text: '',
            box,
            order_by: 'visible_name',
            order_direction: 'asc',
        },
    }
}

export const counterSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setCurrentObjectId: (state, action: PayloadAction<UnitId | undefined>) => {
            state.currentObjectId = action.payload
        },
        setSearchParams: (state, action: PayloadAction<SearchParams>) => {
            state.searchParams = {
                ...state.searchParams,
                ...action.payload,
            }
        },
    },
})

export const { setCurrentObjectId, setSearchParams } = counterSlice.actions

export const selectCurrentObjectId = (state: RootState) => state.data.currentObjectId
export const selectSearchParams = (state: RootState) => state.data.searchParams

export default counterSlice.reducer

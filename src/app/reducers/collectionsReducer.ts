import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

export type UnitId = number

export interface Unit {
    created_at: string
    device: {
        hw_id: string
        id: UnitId
        model: string
        protocol: string
        sim1: string
        sim2: string
        vendor: string
    }
    icon: string
    id: UnitId
    updated_at: string
    vehicle: {
        id: UnitId
        license_plate: string
        make: string
        model: string
        type: number
        vin: string
    }
    visible_name: string
    group_ids?: number[]
    position?: {
        last_nav_data: {
            course: number
            nsat: number
            speed: number
        }
        latitude: number
        longitude: number
        updated_at: string
    }
}

export interface UpdateUnit {
    id: UnitId
    created_at?: string
    device?: {
        hw_id?: string
        model?: string
        protocol?: string
        sim1?: string
        sim2?: string
        vendor?: string
    }
    icon?: string
    updated_at?: string
    vehicle?: {
        license_plate?: string
        make?: string
        model?: string
        type?: number
        vin?: string
    }
    visible_name?: string
    group_ids?: number[]
}

export interface Group {
    type: number
    name: string
    id: number
    created_at?: string
    updated_at?: string
}

export interface UpdateGroup {
    type: number
    name: string
    // id: number,
    // created_at?: string,
    // updated_at?: string,
}

export interface CollectionsState {
    units: { [id: UnitId]: Unit }
}

const initialState: CollectionsState = {
    units: {},
}

export const counterSlice = createSlice({
    name: 'collections',
    initialState,

    reducers: {
        setUnits: (state, action: PayloadAction<Unit[] | undefined>) => {
            action.payload?.forEach((unit) => {
                state.units[unit.id] = unit
            })
        },
    },
})

export const { setUnits } = counterSlice.actions

export const selectObjectById = (state: RootState, objectId?: UnitId): Unit | undefined =>
    objectId ? state.collections.units[objectId] : undefined
export const selectCurrentObjectsByIds = (state: RootState, objectIds: UnitId[]) =>
    objectIds.map((objectId) => state.collections.units[objectId])

export default counterSlice.reducer

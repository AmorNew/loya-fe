import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngTuple } from 'leaflet'

import { RootState } from '../../app/store'
import { Point } from '../../schema/position_pb'

export interface PointsState {
    [deviceId: string]: Point.AsObject
}

const initialState: PointsState = {}

export const counterSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        setPoint: (state, action: PayloadAction<Point.AsObject>) => {
            const { deviceId } = action.payload

            const prevNavigationTime = new Date(state[deviceId].navigationTime)
            const nextNavigationTime = new Date(action.payload.navigationTime)

            if (nextNavigationTime > prevNavigationTime) {
                state[deviceId] = action.payload
            }

            if (nextNavigationTime < prevNavigationTime) {
                console.error('-------------------')
                console.error('nextNavigationTime < prevNavigationTime')
                console.error('next point', action.payload)
                console.error('prevNavigationTime', prevNavigationTime)
                console.error('nextNavigationTime', nextNavigationTime)
            }
        },

        setPoints: (state, action: PayloadAction<Point.AsObject[]>) => {
            action.payload.forEach((point) => {
                const { deviceId } = point

                const prevNavigationTime = new Date(state[deviceId]?.navigationTime)
                const nextNavigationTime = new Date(point.navigationTime)

                if (!state[deviceId]?.navigationTime || nextNavigationTime > prevNavigationTime) {
                    state[deviceId] = state[deviceId] || point
                }
            })
        },
    },
})

export const { setPoint, setPoints } = counterSlice.actions

export const selectPointByObjectId = (state: RootState, objectId?: number): Point.AsObject | undefined =>
    objectId ? state.points[objectId] : undefined
export const selectPointsBounds = (state: RootState): LatLngTuple[] => {
    const bounds: LatLngTuple[] = []

    for (let [, { latitude, longitude }] of Object.entries(state.points)) {
        bounds.push([latitude, longitude])
    }

    return bounds
}

export const selectPoints = (state: RootState): Point.AsObject[] | undefined => Object.values(state.points)

export const isPointOnline = (point: Point.AsObject): boolean => {
    const { navigationTime } = point

    const navigationDate = new Date(navigationTime).getTime()
    const now = new Date().getTime()

    const lastTimeMillis = now - navigationDate

    return lastTimeMillis / (1000 * 60) < 15
}

export default counterSlice.reducer

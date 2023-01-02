import { Identity } from '@ory/client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

export interface UserState {
    identity?: Identity | false
}

const initialState: UserState = {
    identity: undefined,
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIdentity: (state, action: PayloadAction<Identity>) => {
            state.identity = action.payload
        },
        removeIdentity: (state) => {
            state.identity = false
        },
    },
})

export const { setIdentity, removeIdentity } = counterSlice.actions

export const selectUserIdentity = (state: RootState) => state.user.identity

export default counterSlice.reducer

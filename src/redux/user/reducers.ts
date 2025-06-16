import { User } from '../../types/User';
import { UserState } from './types'
import { PayloadAction } from '@reduxjs/toolkit';

export const updateUser = (state: UserState, payload: PayloadAction<User>) => {
    state.user = payload.payload;
}

// Note: normally we don't use this approach i.e. update on the front-end
// and we always fetch data from the bactkend. For simulation purposes only
export const updateUserBalance = (state: UserState, payload: PayloadAction<number>) => {
    if (state.user) {
        state.user.balance -= payload.payload;
    }
}

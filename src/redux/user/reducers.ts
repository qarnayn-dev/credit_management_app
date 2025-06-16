import { localKeys, saveToLocal } from '../../services/localStorage';
import { User } from '../../types/User';
import { UserState } from './types'
import { PayloadAction } from '@reduxjs/toolkit';

export const updateUser = (state: UserState, action: PayloadAction<User>) => {
    state.user = action.payload;
    saveToLocal(localKeys.USER, state.user);
}

// Note: normally we don't use this approach i.e. update on the front-end
// and we always fetch data from the bactkend. For simulation purposes only
export const updateUserBalance = (state: UserState, action: PayloadAction<number>) => {
    if (state.user) {
        state.user.balance -= action.payload;
        saveToLocal(localKeys.USER, state.user);
    }
}

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserState } from './types';
import { updateUser, updateUserBalance } from './reducers';
import { loadFromLocal, localKeys } from '../../services/localStorage';
import { User } from '../../types/User';

export const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser,
        updateUserBalance,
    },
});

export const rehydrateUser = createAsyncThunk('user/rehydrate', async (_, thunkApi) => {
    const user = (await loadFromLocal<User>(localKeys.USER)) ?? {
        id: 1,
        name: 'Alexandrea',
        accountNumber: '800285582004',
        identityNumber: '010101142004',
        identityType: 'mykad',
        balance: 300,
        token: '',
    };
    thunkApi.dispatch(userAction.updateUser(user));
})

export const userAction = userSlice.actions;
export default userSlice.reducer;

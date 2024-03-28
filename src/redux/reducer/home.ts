import { createSlice } from '@reduxjs/toolkit';
import { IHomeState } from 'utils/interface';

export const initialState: IHomeState = {
    phones: [],
    loading: false,
    offset: 0,
    limit: 20,
};

export const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {
        updateLoadingHome: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            };
        },
        updatePhoneHome: (state, action) => {
            return {
                ...state,
                phones: action.payload,
            };
        },
    },
});
export const { updateLoadingHome, updatePhoneHome } = homeSlice.actions;

export const HomeReducer = homeSlice.reducer;

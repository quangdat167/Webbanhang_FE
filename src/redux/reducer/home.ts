import { createSlice } from '@reduxjs/toolkit';
import Config from 'utils/Config';
import { IHomeState } from 'utils/interface';

export const initialState: IHomeState = {
    phones: [],
    loading: false,
    offset: 0,
    limit: 20,
    sortby: Config.SORT_BY.POPULAR,
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
        updateSortByHome: (state, action) => {
            return {
                ...state,
                sortby: action.payload,
            };
        },
    },
});
export const { updateLoadingHome, updatePhoneHome, updateSortByHome } = homeSlice.actions;

export const HomeReducer = homeSlice.reducer;

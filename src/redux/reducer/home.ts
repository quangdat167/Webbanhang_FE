import { createSlice } from '@reduxjs/toolkit';
import Config from 'utils/Config';
import { IHomeState } from 'utils/interface';

export const initialState: IHomeState = {
    phones: [],
    items: [],
    loading: false,
    offset: 0,
    totalRemaining: 0,
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
                phones: action.payload.phones,
                offset: action.payload.offset ? action.payload.offset : state.offset,
                totalRemaining: action.payload.totalRemaining,
            };
        },
        updateSortByHome: (state, action) => {
            return {
                ...initialState,
                sortby: action.payload,
            };
        },
        updateItemsHome: (state, action) => {
            return {
                ...state,
                items: action.payload.items,
                offset: action.payload.offset ? action.payload.offset : state.offset,
                totalRemaining: action.payload.totalRemaining,
            };
        },
    },
});
export const { updateLoadingHome, updatePhoneHome, updateSortByHome, updateItemsHome } =
    homeSlice.actions;

export const HomeReducer = homeSlice.reducer;

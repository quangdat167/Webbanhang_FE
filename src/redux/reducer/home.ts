import { createSlice } from '@reduxjs/toolkit';
import Config from 'utils/Config';
import { IHomeState } from 'utils/interface';

export const initialState: IHomeState = {
    products: [],
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
        updateProductsHome: (state, action) => {
            return {
                ...state,
                products: action.payload.products,
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
    },
});
export const { updateLoadingHome, updateProductsHome, updateSortByHome } = homeSlice.actions;

export const HomeReducer = homeSlice.reducer;

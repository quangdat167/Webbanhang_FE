import { createSlice } from '@reduxjs/toolkit';
import { IPhone } from 'utils/interface';

export interface ICompare {
    open: boolean;
    phone1: IPhone;
    phone2: IPhone;
}

export const initialState: ICompare = {} as ICompare;

export const CompareSlice = createSlice({
    name: 'compare',
    initialState: initialState,
    reducers: {
        openCompare: (state, action) => {
            return {
                ...state,
                open: action.payload,
            };
        },
        changeComparePhone1: (state, action) => {
            return {
                ...state,
                phone1: action.payload,
            };
        },
        changeComparePhone2: (state, action) => {
            return {
                ...state,
                phone2: action.payload,
            };
        },
    },
});

export const { openCompare, changeComparePhone1, changeComparePhone2 } = CompareSlice.actions;

export const compareReducer = CompareSlice.reducer;

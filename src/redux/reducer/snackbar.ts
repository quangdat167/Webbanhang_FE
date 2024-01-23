import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

export interface ISnackbar {
    open: boolean;
    content: string;
    severity: AlertColor;
}

export const initialState: ISnackbar = {} as ISnackbar;

export const SnackbarSlice = createSlice({
    name: 'snackbar',
    initialState: initialState,
    reducers: {
        pushSnackbar: (state, action) => {
            const newState = { ...action.payload, open: true };
            return newState;
        },
        clearSnackbar: (state, action) => {
            return {
                ...state,
                open: false,
            };
        },
    },
});

export const { pushSnackbar, clearSnackbar } = SnackbarSlice.actions;

export const snackbarReducer = SnackbarSlice.reducer;

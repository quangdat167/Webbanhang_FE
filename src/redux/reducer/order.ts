import { createSlice } from '@reduxjs/toolkit';
import { IOrder } from 'utils/interface';

export const initialState: IOrder[] = [] as IOrder[];

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addOrders: (state, action) => {
            const newState = [...action.payload];
            return newState;
        },
    },
});

export const { addOrders } = orderSlice.actions;

export const OrderReducer = orderSlice.reducer;

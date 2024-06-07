import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'utils/interface';

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: [] as IProduct[],
    reducers: {
        addToPurchase: (state, action: PayloadAction<IProduct[]>) => {
            const newState = action.payload;
            return newState;
        },
    },
});

export const { addToPurchase } = purchaseSlice.actions;

export const purchaseReducer = purchaseSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from 'utils/interface';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {} as ICartItem,
    reducers: {
        // resetCart: (state) => {
        //     state = [];
        // },
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const newState = action.payload;
            return newState;
        },
        deleteFromCart: (state, action) => {
            const index = state.products.findIndex((prod) => prod.phoneId === action.payload);
            if (index > -1) state.products.splice(index, 1);
        },
        // loadCard: (state, action: PayloadAction<ICartItem[]>) => {
        //     state.splice(0, state.length, ...action.payload);
        // },
    },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;

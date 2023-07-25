import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { cartProps } from 'utils/interface';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [] as cartProps[],
    reducers: {
        resetCart: (state) => {
            state = [];
        },
        addToCart: (state, action: PayloadAction<cartProps>) => {
            state.push(action.payload);
        },
        deleteFromCart: (state, action) => {
            const index = state.findIndex((cart) => cart._id === action.payload);
            state.splice(index, 1);
        },
        loadCard: (state, action: PayloadAction<cartProps[]>) => {
            state.splice(0, state.length, ...action.payload);
        },
    },
});

export const { resetCart, addToCart, loadCard, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;

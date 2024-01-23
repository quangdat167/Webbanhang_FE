import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../pages/Cart/CartSlice';
import { UserInfoReducer } from './reducer/userinfo';
import { snackbarReducer } from './reducer/snackbar';
import { OrderReducer } from './reducer/order';
import { compareReducer } from './reducer/compare';

const store = configureStore({
    reducer: {
        userInfoState: UserInfoReducer,
        cart: cartReducer,
        snackbarState: snackbarReducer,
        orderState: OrderReducer,
        compareState: compareReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

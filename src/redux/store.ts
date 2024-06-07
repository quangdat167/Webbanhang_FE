import { configureStore } from '@reduxjs/toolkit';
import { CartReducer } from 'pages/Cart/CartSlice';
import { purchaseReducer } from 'pages/Cart/purchaseSlice';
import { compareReducer } from './reducer/compare';
import { FilterReducer } from './reducer/filter';
import { HomeReducer } from './reducer/home';
import { OrderReducer } from './reducer/order';
import { snackbarReducer } from './reducer/snackbar';
import { UserInfoReducer } from './reducer/userinfo';

const store = configureStore({
    reducer: {
        homeState: HomeReducer,
        userInfoState: UserInfoReducer,
        cart: CartReducer,
        purchaseState: purchaseReducer,
        snackbarState: snackbarReducer,
        orderState: OrderReducer,
        compareState: compareReducer,
        filterState: FilterReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

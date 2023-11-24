import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../pages/Cart/CartSlice';
import { UserInfoReducer } from './reducer/userinfo';

const store = configureStore({
    reducer: {
        userInfoState: UserInfoReducer,
        cart: cartReducer,
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

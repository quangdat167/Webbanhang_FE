import { createSlice } from '@reduxjs/toolkit';

export interface IUserInfo {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    role: number;
    phone: string;
    address: string;
}

export const initialState: IUserInfo = {} as IUserInfo;

export const UserInfoSlice = createSlice({
    name: 'userInfoState',
    initialState: initialState,
    reducers: {
        loginReducer: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        getUserInfoReducer: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        signOutReducer: (state, action) => {
            return initialState;
        },
    },
});

export const { loginReducer, getUserInfoReducer, signOutReducer } = UserInfoSlice.actions;

export const UserInfoReducer = UserInfoSlice.reducer;

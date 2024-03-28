import { createSlice } from '@reduxjs/toolkit';
import { IFilter, IOrder } from 'utils/interface';

export const initialState: IFilter = {
    brand: [],
    price: [],
    type: [],
    ram: [],
    rom: [],
    charging_feature: [],
} as IFilter;

export const filterSlice = createSlice({
    name: 'filterState',
    initialState: initialState,
    reducers: {
        addItemFilter: (state, action) => {
            const { brand, price, type, ram, rom, charging_feature } = action.payload;
            return {
                ...state,
                brand: brand ? [...state.brand, brand] : state.brand,
                price: price ? [...state.price, price] : state.price,
                type: type ? [...state.type, type] : state.type,
                ram: ram ? [...state.ram, ram] : state.ram,
                rom: rom ? [...state.rom, rom] : state.rom,
                charging_feature: charging_feature
                    ? [...state.charging_feature, charging_feature]
                    : state.charging_feature,
            };
        },
        removeItemFilter: (state, action) => {
            const { brand, price, type, ram, rom, charging_feature } = action.payload;
            return {
                ...state,
                brand: state.brand?.filter((item) => item !== brand),
                price: state.price?.filter((item) => item !== price),
                type: state.type?.filter((item) => item !== type),
                ram: state.ram?.filter((item) => item !== ram),
                rom: state.rom?.filter((item) => item !== rom),
                charging_feature: state.charging_feature?.filter(
                    (item) => item !== charging_feature,
                ),
            };
        },

        removeAllItemFilter: (state, action) => {
            const { brand, price, type, ram, rom, charging_feature, all } = action.payload;
            if (all) {
                return initialState;
            }
            return {
                ...state,
                brand: brand ? [] : state.brand,
                price: price ? [] : state.price,
                type: type ? [] : state.type,
                ram: ram ? [] : state.ram,
                rom: rom ? [] : state.rom,
                charging_feature: charging_feature ? [] : state.charging_feature,
            };
        },

        rangePriceFilter: (state, action) => {
            const { price } = action.payload;
            return {
                ...state,
                price,
            };
        },
    },
});

export const { addItemFilter, removeItemFilter, removeAllItemFilter, rangePriceFilter } =
    filterSlice.actions;

export const FilterReducer = filterSlice.reducer;

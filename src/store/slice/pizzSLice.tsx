// src/features/pizzaSlice.js

import { createSlice } from "@reduxjs/toolkit";

interface Pizza {
  id: number;
  type: string;
  size: string;
  base: string;
  stage: number;
  startTime: string;
  orderPlaceTime?: string;
}

interface PizzaState {
  pizzas: Pizza[];
}

const initialState: PizzaState = {
  pizzas: [],
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      state.pizzas.push(action.payload);
    },
    moveToNext: (state: any, action) => {
      state.pizzas = state?.pizzas?.map((item: any) => {
        if (item.id === action.payload.id)
          return {
            ...item,
            stage: item.stage + 1,
            startTime: new Date().getTime(),
          };
        else return { ...item };
      });
    },

    cacelOrder: (state: any, action) => {
      state.pizzas = state?.pizzas?.map((item: any) => {
        if (item.id === action.payload.id)
          return {
            ...item,
            stage: -1,
            startTime: new Date().getTime(),
          };
        else return { ...item };
      });
    },
    // Add other actions as needed
  },
});

export const { addPizza, moveToNext, cacelOrder } = pizzaSlice.actions;

export default pizzaSlice.reducer;
